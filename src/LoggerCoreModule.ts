import {
  ConsoleLogger,
  DynamicModule,
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { PARAMS_PROVIDER_TOKEN, WINSTON_TOKEN, InjectWinston, logHttpConstant } from "./contants";
import { CustomLogger } from "./LoggerService";
import { Params, ParmasAsync } from "./params";
import { init, container } from "./initWinston";
import { Request, Response } from "express";
import * as morgan from 'morgan'
import { isObject } from "./utils";

const DEFAULT_ROUTES = [{ path: "*", method: RequestMethod.ALL }];
@Global()
@Module({})
export class LoggerCoreModule implements NestModule {
  static forRoot(params: Params | undefined): DynamicModule {
    const moduleOptions: Partial<DynamicModule> = {};

    return Object.assign(moduleOptions, {
      module: LoggerCoreModule,
      providers: [
        {
          provide: PARAMS_PROVIDER_TOKEN,
          useValue: params,
        },
        {
          provide: WINSTON_TOKEN,
          useFactory: async (params: any) => {
            await init(params);
            return new CustomLogger();
          },
          inject: [PARAMS_PROVIDER_TOKEN],

        },
      ],
      exports: [WINSTON_TOKEN]
    });
  }
  static forRootAsync(params: ParmasAsync | undefined): DynamicModule {
    const moduleOptions: Partial<DynamicModule> = {};

    return Object.assign(moduleOptions, {
      module: LoggerCoreModule,
      imports: params.imports,
      providers: [
        {
          provide: PARAMS_PROVIDER_TOKEN,
          useFactory: params.useFactory,
          inject: params.inject,
        },
        {
          provide: WINSTON_TOKEN,
          useFactory: async (params: any) => {
            await init(params);
            return new CustomLogger();
          },
          inject: [PARAMS_PROVIDER_TOKEN],
        },
      ],
      exports: [WINSTON_TOKEN]
    });
  }
  constructor(
    @Inject(PARAMS_PROVIDER_TOKEN) private readonly params: Params,
    @InjectWinston() private readonly logger: CustomLogger
  ) { }
  configure(consumer: MiddlewareConsumer) {

    if (this.params.logHttp) {
      // 如果是boolean，直接使用middleware记录
      morgan.token('body', (req: Request, res: Response) => JSON.stringify(req.body));
      morgan.token('time', (req: Request, res: Response) => new Date() + "");
      let middleware = morgan(':remote-addr - :remote-user [:time] ":method :url HTTP/:http-version" {body\::body} :status :res[content-length] ":referrer" ":user-agent"', {
        stream: {
          write: (str) => {
            container.get(logHttpConstant).info(str);
          }
        }
      })
      if (isObject<Params['logHttp']>(this.params.logHttp)) {
        const { exclude, forRoutes = DEFAULT_ROUTES } = this.params.logHttp
        if (exclude) {
          consumer
            .apply(middleware)
            .exclude(...exclude)
            .forRoutes(...forRoutes);
        } else {
          consumer.apply(middleware).forRoutes(...forRoutes);
        }
      } else {
        consumer.apply(middleware).forRoutes('*');
      }

    }

  }

}

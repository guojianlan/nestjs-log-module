import {
  DynamicModule,
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { PARAMS_PROVIDER_TOKEN } from "./contants";
import { LoggerService } from "./LoggerService";
import { Params, ParmasAsync } from "./params";
import * as winstonOrigin from "winston";
import { init } from "./initWinston";
export const winston = winstonOrigin;
@Module({})
@Global()
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
          provide: LoggerService,
          useFactory: async (params: any) => {
            init(params);
            return new LoggerService();
          },
          inject: [PARAMS_PROVIDER_TOKEN],
        },
      ],
      exports: [LoggerService],
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
          provide: LoggerService,
          useFactory: async (params: any) => {
            init(params);
            return new LoggerService();
          },
          inject: [PARAMS_PROVIDER_TOKEN],
        },
      ],
      exports: [LoggerService],
    });
  }
  constructor(@Inject(PARAMS_PROVIDER_TOKEN) private readonly params: any) {}
  configure(consumer: MiddlewareConsumer) {
    console.log(this.params, "configure");
  }
}

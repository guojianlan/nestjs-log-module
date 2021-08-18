import {
  DynamicModule,
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { createLoggerProvider, MyLoggerOptions } from "./logger.provider";
import { MyLogger } from "./logger.service";

@Module({})
@Global()
export class LoggerModule implements NestModule {
  constructor() {
    console.log('LoggerModule')
  }
  static register(options: MyLoggerOptions[]): DynamicModule {
    const providers = createLoggerProvider(options);
    return {
      module: LoggerModule,
      providers: [...providers],
      exports: [...providers],
    };
  }
  configure(consumer: MiddlewareConsumer) {
    console.log('consumer');
  }
}

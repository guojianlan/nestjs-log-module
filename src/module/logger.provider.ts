import { Provider } from "@nestjs/common";
import * as winston from "winston";
import { LoggerOptions } from "winston";
import { MyLogger } from "./logger.service";
export interface MyLoggerOptions {
  id: string;
  options?: LoggerOptions;
}
const { format } = winston;
// const { combine, label, json } = format;
export function initLoggerService(options: MyLoggerOptions[]) {
 
  options.forEach((item) => {
    winston.loggers.add(item.id, item.options);
  });
}
export function createLoggerProvider(options: MyLoggerOptions[]): Provider[] {
  initLoggerService(options);
  return [
    {
      provide: MyLogger,
      useFactory: () => {
        console.log("useFactory register -- logger");
        return new MyLogger();
      },
    },
  ];
}

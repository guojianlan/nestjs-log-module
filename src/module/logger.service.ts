import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from "@nestjs/common";
import * as winstonObj from "winston";
let x = 0;
export const winston = winstonObj;
@Injectable()
export class MyLogger {
  context: string;
  constructor(context?: string) {
    if (context) {
      this.context = context;
    }
  }
  log(message: string, context: string) {
    /* your implementation */
    winston.loggers.get(context).info(message);
  }
  error(message: string, trace: string, context: string) {
    /* your implementation */
    winston.loggers.get(context).error(message);
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
  setContext(context) {
    this.context = context;
  }
}

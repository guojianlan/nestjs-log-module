import { Injectable } from "@nestjs/common";
import { winston } from "./LoggerCoreModule";
@Injectable()
export class LoggerService {
  constructor() {}
  log(message: string) {
    console.log(message, "LoggerService");
    winston.loggers.get("xx").info(message);
  }
}

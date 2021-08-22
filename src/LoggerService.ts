import { Injectable, LoggerService } from "@nestjs/common";
import { container } from './initWinston';
@Injectable()
export class CustomLogger implements LoggerService {
  constructor() {

  }
  log(message: unknown, container_name: string = 'default') {
    container.get(container_name).info(message)
  }
  error(message: unknown, container_name: string = 'default') {
    if(message instanceof Error){
      container.get(container_name).error({
        stack:message.stack,
      })
    }else{
      container.get(container_name).error(message)
    }
   
  }
  warn(message: unknown, container_name: string = 'default') {
    container.get(container_name).error(message)
  }
  debug(message: unknown, container_name: string = 'default') {
    container.get(container_name).error(message)
  }
}

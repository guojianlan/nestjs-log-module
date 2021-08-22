import { MiddlewareConfigProxy, ModuleMetadata } from "@nestjs/common/interfaces";
import * as winstonClass from 'winston'
export type winstonParsme = { id: string, options?: winstonClass.LoggerOptions }[]
export interface LogHttpMiddleware {
  exclude?: Parameters<MiddlewareConfigProxy["exclude"]>;
  forRoutes?: Parameters<MiddlewareConfigProxy["forRoutes"]>;
}
export interface Params {
  logHttp?: {
    container?: string,
    fileOption?: winstonClass.transports.FileTransportOptions,
  } & LogHttpMiddleware
  initWinston?: (winston: typeof winstonClass) => Promise<winstonParsme> | winstonParsme
}

export interface ParmasAsync extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useFactory?: (...args: any[]) => Params | Promise<Params>;
}

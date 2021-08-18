import { ModuleMetadata } from "@nestjs/common/interfaces";

export interface Params {
  logHttp?: {};
}

export interface ParmasAsync extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useFactory?: (...args: any[]) => Params | Promise<Params>;
}

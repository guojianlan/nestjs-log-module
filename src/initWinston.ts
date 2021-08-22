import { Param } from "@nestjs/common";
import * as winston from "winston";
import { logHttpConstant } from "./contants";
import { Params, winstonParsme } from "./params";
export const container = new winston.Container();
const { format } = winston;
const { combine, label, json } = format;
export const addContainer = (id: string, options: winston.LoggerOptions = {
  level:'info',
  format: combine(
    label({ label: id }),
    json()),
  transports: [new winston.transports.Console()]
}) => {
  return {
    id: id,
    options: options
  }
}
export const addDefaultContainer = (options: winston.LoggerOptions = {
  format: combine(
    label({ label: "default Logger" }),
    json()
  ),
  transports: [
    new winston.transports.Console()
  ]
}) => {
  return addContainer('default', options);

}
export const init = async (params: Params) => {
  let result = await params.initWinston(winston)
  result.forEach(item => {
    container.add(item.id, item.options)
  })
  if (params.logHttp) {
    container.add(logHttpConstant, {
      format: combine(label({
        label: 'logHTTP'
      }), json()),
      transports: [
        new winston.transports.Console({

          level: 'info'
        }),
        new winston.transports.File(Object.assign({
          filename: `log/request/${process.env.npm_package_name}.log`,
          level: 'info'
        }, (params as any).logHttp.fileOption)),
      ]
    })
  }
  // container.add('default', {
  //   format: combine(
  //     label({ label: "default Logger" }),
  //     json()
  //   ),
  //   transports: [
  //     new winston.transports.Console()
  //   ]
  // })
};

import * as winston from "winston";
const { format } = winston;
const { combine, label, json } = format;
const container = new winston.Container();
export const init = (params: any) => {
  console.log(winston);
};

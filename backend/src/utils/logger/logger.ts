/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

const newrelicFormatter = require('@newrelic/winston-enricher');

const newrelicWinstonFormatter = newrelicFormatter(winston);

type LogParams = Record<string, unknown> | Error;

@Injectable({ scope: Scope.REQUEST })
class WinstonLogger {
  logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label: 'test' }),
        newrelicWinstonFormatter(),
      ),
      transports: [
        new winston.transports.Console({
          level: 'debug',
        }),
      ],
      silent: process.env.ENV === 'TEST',
    });
  }

  public info(message: string, params?: LogParams) {
    return this.logger.info(message, params);
  }

  public debug(message: string, params?: LogParams) {
    return this.logger.debug(message, params);
  }

  public error(message: string, params?: LogParams) {
    return this.logger.error(message, params);
  }

  public warn(message: string, params?: LogParams) {
    return this.logger.warn(message, params);
  }
}

export { WinstonLogger as InjectableLogger };

export const Logger = new WinstonLogger();

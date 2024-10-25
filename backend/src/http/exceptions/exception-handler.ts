/* eslint-disable no-console */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Logger } from 'utils/logger';
import { DuplicatedRecordException } from '.';
import { ExistingUserOnCreateException } from './existing-user-on-create-exception';

interface ResponseObject {
  statusCode: number;
  message: Array<string>;
  error: string;
}

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  private exception: any;

  private request: Request;

  private exceptionData: { status: HttpStatus; body: any };

  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    this.exception = exception;
    this.request = ctx.getRequest();
    const response = ctx.getResponse();

    switch (true) {
      case exception instanceof HttpException:
        this.onHttpException();
        break;

      case exception instanceof ExistingUserOnCreateException:
        this.onExistingUserOnCreateException();
        break;

      case exception instanceof DuplicatedRecordException:
        this.onDuplicatedRecordsException();
        break;

      default:
        this.defaultException();
    }

    Logger.error(
      '[ExceptionHandler] Exception information: ',
      this.exceptionData.body,
    );

    response
      .status(this.exceptionData.status)
      .json(this.removeSensitiveInfoFromBody(this.exceptionData.body));
  }

  private removeSensitiveInfoFromBody(
    body: Record<string, any>,
  ): Record<string, any> {
    const { stacktrace: _stacktrace, ...bodyWithoutSensitiveInfo } = body;
    return bodyWithoutSensitiveInfo;
  }

  private onHttpException() {
    const responseBody = this.exception.getResponse() as
      | string
      | ResponseObject;
    const status = this.exception.getStatus();
    const body = {
      statusCode: status,
      message:
        typeof responseBody === 'string'
          ? [responseBody]
          : responseBody.message,
      error: HttpStatus[status],
      path: this.request.url,
    };

    this.exceptionData = { status, body };
  }

  private onExistingUserOnCreateException() {
    const status = HttpStatus.CONFLICT;
    const body = {
      statusCode: status,
      message: 'EXISTING_USER_ON_CREATE',
      error: HttpStatus[status],
      path: this.request.url,
    };

    this.exceptionData = { status, body };
  }

  private onDuplicatedRecordsException() {
    const status = HttpStatus.CONFLICT;
    const body = {
      statusCode: status,
      message: 'DUPLICATED_RECORD',
      error: HttpStatus[status],
      path: this.request.url,
    };

    this.exceptionData = { status, body };
  }

  private defaultException() {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const body = {
      statusCode: status,
      message: [this.exception.message],
      error: HttpStatus[status],
      path: this.request.url,
      stacktrace: this.exception.stack,
    };

    this.exceptionData = { status, body };
  }
}

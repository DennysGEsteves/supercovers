/* eslint-disable no-console */
import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'utils/logger';
// import { CustomResponse } from 'http/response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map((response) => this.responseHandler(response, context)));
  }

  private responseHandler = (res: any, context: ExecutionContext) => {
    Logger.info(`[ResponseMiddleware] ${JSON.stringify(res)}`);
    // if (response instanceof CustomResponse) {
    // const { status, body,  } = res;
    //   this.httpAdapter.status(httpResponse, status);
    //   return body;
    // }
    return res;
  };
}

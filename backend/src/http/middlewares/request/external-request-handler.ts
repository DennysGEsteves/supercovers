import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ExternalRequestFailed } from 'http/exceptions';
import { InjectableLogger } from 'utils/logger';
import { RequestConfig, Response } from './request-facade.type';

@Injectable()
export class ExternalRequestHandler {
  constructor(private readonly logger: InjectableLogger) {}

  public async executeRequest<T>(payload: RequestConfig): Promise<Response<T>> {
    this.logger.info(
      `[ExternalRequestHandler] Requesting (${payload.method}) ${payload.url}`,
      {
        payloadData: {
          method: payload.method,
          url: payload.url,
          body: JSON.stringify(payload.data),
          params: JSON.stringify(payload.params),
        },
      },
    );
    try {
      const response = await axios.request<T>(payload);
      this.logger.info(
        `[ExternalRequestHandler] Responded successfully (${payload.method}) ${payload.url}`,
        {
          responseData: JSON.stringify(response.data),
        },
      );
      return response;
    } catch (error) {
      const { method } = payload;
      const { url } = payload;
      const status = error?.response?.status;
      const responseData = error?.response?.data;
      this.logger.error(
        `[ExternalRequestHandler] Responded with error [${status}] (${method}) ${url}`,
        {
          responseData: JSON.stringify(responseData),
        },
      );

      throw new ExternalRequestFailed(
        error.message,
        method,
        url,
        status,
        responseData,
      );
    }
  }
}

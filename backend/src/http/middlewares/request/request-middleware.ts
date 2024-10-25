import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { InjectableLogger } from 'utils/logger';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(private readonly logger: InjectableLogger) {}

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.info(
      `[RequestMiddleware] (${req.method}) ${
        req.originalUrl
      } body: ${JSON.stringify(req.body)}`,
    );
    next();
  }
}

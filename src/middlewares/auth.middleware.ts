import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types/express.interface';

@Injectable()
export class AuthModdleware implements NestMiddleware {
  async use(request: ExpressRequest, response: Response, next: NextFunction) {
    if (!request.headers.authorization) {
      request.user = null
      next()
      return
    }

    const token = request.headers.authorization.split(' ')[1]
    console.log(token)
    next()
  }
}
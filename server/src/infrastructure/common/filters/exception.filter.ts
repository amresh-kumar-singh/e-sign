import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(BadRequestException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log('res', request.file);
    // if (request.file) {
    fs.unlink(request.file.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    // }
    response.status(status).json(exception.getResponse());
  }
}

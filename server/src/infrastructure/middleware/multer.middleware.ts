import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    const customFileName = `${Date.now()}-${Math.random() * 1e10 || 0}-${file.originalname}`;
    callback(null, customFileName);
  },
});

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  //   constructor(private readonly multerOptions: multer.Options) {}
  private multerInstance = multer();

  use(req: Request, res: Response, next: NextFunction) {
    // const multerInstance = multer(this.multerOptions);
    this.multerInstance.any()(req, res, next);
  }
}

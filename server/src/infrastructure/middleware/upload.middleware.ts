import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';

// const upload = multer({ dest: 'uploads/' }).single('file');
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
const upload = multer({ storage: storage }).single('files');

@Injectable()
export class MulterSingleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    upload(req, res, function (err) {
      console.log(err);
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).send({ message: 'Multer error', error: err });
      } else if (err) {
        // An unknown error occurred when uploading
        return res.status(500).send({ message: 'Unknown error', error: err });
      }
      // Everything went fine, proceed to the next middleware
      next();
    });
  }
}

// import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import { FileSizeValidator } from '../common/validators/file-size.validator';
// import { FileTypeValidator } from '../common/validators/file-type.validator';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Injectable()
// export class FileValidationMiddleware {
//   constructor(
//     // private readonly fileSizeValidator: FileSizeValidator,
//     private readonly fileTypeValidator: FileTypeValidator,
//   ) {}
//   // @UseInterceptors(FileInterceptor('file'))
//   validat(req: Request, file: Express.Multer.File, cb: any) {
//     // const file = req['files']?.[0];
//     console.log('nesx', file);
//     const maxFileSize = 10 * 1024 * 1024; // 10 MB
//     const allowedFileTypes = [
//       'image/jpeg',
//       'image/png',
//       'image/gif',
//       'text/plain',
//     ];
//     try {
//       //Validate file size
//       // this.fileSizeValidator.validate(file.size, maxFileSize);

//       //Validate file type
//       const fileMimeType = this.fileTypeValidator.getFileMimeType(
//         file.originalname,
//       );
//       this.fileTypeValidator.validate(fileMimeType, allowedFileTypes);
//       cb(null);
//     } catch (error) {
//       cb(error);
//       console.log(error);
//     }
//   }
// }

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { FileTypeValidator } from './file-type.validator';
import { FileSizeValidator } from './file-size.validator';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(
    private readonly fileSizeValidator: FileSizeValidator,
    private readonly fileTypeValidator: FileTypeValidator,
  ) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const file = value;
    if (!file) throw new BadRequestException('Required field File is missing!');
    const maxFileSize = +process.env.MAX_FILE_SUPPORT_IN_MB * 1024 * 1024; // 10 MB
    const allowedFileTypes = [process.env.SUPPORTED_MIME_TYPES];

    //Validate file size
    this.fileSizeValidator.validate(file.size, maxFileSize);

    //Validate file type
    const fileMimeType = this.fileTypeValidator.getFileMimeType(
      file.originalname,
    );
    this.fileTypeValidator.validate(fileMimeType, allowedFileTypes);
    return value;
  }
}

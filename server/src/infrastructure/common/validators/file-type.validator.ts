import { BadRequestException, Injectable } from '@nestjs/common';
import * as mime from 'mime-types';

@Injectable()
export class FileTypeValidator {
  constructor() {}

  validate(fileMimeType: string, allowedTypes: string[]): void {
    if (!allowedTypes.includes(fileMimeType)) {
      throw new BadRequestException(
        `File type is not allowed. Allowed types are: ${allowedTypes.join(', ')}`,
      );
    }
  }

  getFileMimeType(fileName: string): string {
    return mime.lookup(fileName);
  }
}

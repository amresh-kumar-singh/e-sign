import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileSizeValidator {
  validate(fileSize: number, maxSize: number): void {
    if (fileSize > maxSize) {
      throw new BadRequestException(
        `File size exceeds the maximum allowed limit of ${maxSize / (1024 * 1024)} MB`,
      );
    }
  }
}

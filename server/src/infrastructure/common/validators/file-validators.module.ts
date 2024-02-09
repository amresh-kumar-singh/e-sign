import { Module } from '@nestjs/common';
import { FileSizeValidator } from './file-size.validator';
import { FileTypeValidator } from './file-type.validator';

@Module({
  providers: [FileSizeValidator, FileTypeValidator],
  exports: [FileSizeValidator, FileTypeValidator], // Export validators to be used in other modules
})
export class FileValidatorsModule {}

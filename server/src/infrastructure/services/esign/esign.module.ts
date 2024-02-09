import { Module } from '@nestjs/common';
import { EsignService } from './esign.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  providers: [EsignService],
  exports: [EsignService],
  imports: [HttpModule],
})
export class EsignModule {}

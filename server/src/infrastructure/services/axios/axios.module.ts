import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosService } from './axiosinstance.service';

@Module({
  providers: [AxiosService],
  exports: [AxiosService],
  imports: [HttpModule],
})
export class AxiosModule {}

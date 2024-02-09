import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { map } from 'rxjs';
import { AxiosService } from '../axios/axiosinstance.service';
import * as FormData from 'form-data';
import * as fs from 'fs';
const templates = {
  template_name: 'Sequential',
  expiration_days: 1,
  is_sequential: true,
  reminder_period: 8,
  email_reminders: false,
  actions: [
    {
      action_type: 'VIEW',
      recipient_name: '',
      role: '1',
      recipient_email: 'kumar.akumar.amresh@gmail.com',
      private_notes: 'Please get back to us for further queries',
      verify_recipient: false,
      verification_type: 'EMAIL',
      verification_code: '',
    },
    {
      action_type: 'SIGN',
      signing_order: 0,
      recipient_name: '',
      role: '2',
      recipient_email: 'amreshkmrsingh@hotmail.com',
      private_notes: 'Please get back to us for further Role 2',
      verify_recipient: false,
      verification_type: 'EMAIL',
      verification_code: '',
    },
    {
      action_type: 'SIGN',
      signing_order: 1,
      recipient_name: '',
      role: '3',
      recipient_email: '0to1official@gmail.com',
      private_notes: 'Please get back to us for further Role 3',
      verify_recipient: false,
      verification_type: 'EMAIL',
      verification_code: '',
    },
  ],
};

@Injectable()
export class UploadService {
  constructor(private readonly axiosService: AxiosService) {}
  async uploadFile(file: Express.Multer.File) {
    console.log(file, typeof file);
    const data = fs.readFileSync(file.path);
    // console.log(data);
    // return;
    const axiosInstance = this.axiosService.getAxiosInstance();
    const formData = new FormData();
    const blob = new Blob([data], { type: file.mimetype });
    console.log(blob);
    formData.append('file', data, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    formData.append('data', JSON.stringify({ templates }));
    // return;
    // Api call
    try {
      const response = await axiosInstance.post('templates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error, 'upload file service');
    }
  }
}

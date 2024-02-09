import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    const data = fs.readFileSync(file.path);
    // Hard coding all these data
    const templates = {
      template_name: file.originalname,
      expiration_days: 1,
      is_sequential: true,
      reminder_period: 8,
      email_reminders: false,
      actions: [],
    };

    const axiosInstance = this.axiosService.getAxiosInstance();
    const formData = new FormData();

    formData.append('file', data, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    formData.append('data', JSON.stringify({ templates }));

    try {
      const response = await axiosInstance.post('templates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      const template_id = data.templates?.template_id;
      const template_name = data.templates?.template_name;
      const document_id = data.templates?.document_fields?.[0]?.document_id;
      if (!template_id || !document_id)
        throw new InternalServerErrorException(
          'Internal Server Error occurred',
        );
      // Saving response in JSON file using template id as file name
      const structureData = { upload: response.data };
      fs.writeFileSync(
        `${template_id}.json`,
        JSON.stringify(structureData, null, 2),
      );

      // Sending only important data to client
      return { template_id, document_id, template_name };
    } catch (error) {
      console.log(error, 'upload file service');
    }
  }
}

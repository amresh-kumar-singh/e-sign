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
import { AddEsignTag } from 'src/domain/upload/upload.interface';

const templatesObj = {
  document_fields: [
    {
      fields: {
        image_fields: [],
        date_fields: [],
        check_boxes: [],
        radio_groups: [],
        text_fields: [],
      },
      deleted_fields: [],
      document_id: '57265000000034044',
    },
  ],
  actions: [
    {
      action_type: 'VIEW',
      signing_order: -1,
      recipient_name: 'R', //Dynamic
      role: '1', //Dynamic
      recipient_email: '0to1official@gmail.com', //Dynamic
      recipient_phonenumber: '',
      recipient_countrycode: '',
      private_notes: 'Please get back to us for further queries',
      verify_recipient: false,
      verification_type: 'EMAIL',
      deleted_fields: [],
      deleted_radio_fields: [],
      fields: {
        text_fields: [
          {
            field_type_name: 'Email',
            field_name: 'Email',
            document_id: '57265000000034044',
            is_mandatory: false,
            page_no: 0,
            x_coord: 56,
            y_coord: 10,
            abs_width: 100,
            abs_height: 10,
            text_property: {
              font: 'Arial',
              font_size: 11,
              font_color: '000000',
              is_bold: false,
              is_italic: false,
            },
          },
        ],
        image_fields: [],
        date_fields: [],
        check_boxes: [],
        radio_groups: [],
      },
    },
    {
      // action_id: '57265000000034062',
      action_type: 'SIGN',
      signing_order: 0,
      // recipient_name: 'R2',
      role: '2',
      // recipient_email: 'amreshkmrsingh@hotmail.com',
      recipient_phonenumber: '',
      recipient_countrycode: '',
      private_notes: 'Please get back to us for further queries',
      verify_recipient: false,
      verification_type: 'EMAIL',
      deleted_fields: [],
      deleted_radio_fields: [],
      fields: {
        text_fields: [
          {
            field_type_name: 'Email',
            field_name: 'Email',
            // document_id: '57265000000034044',
            is_mandatory: false,
            page_no: 0,
            x_coord: 56,
            y_coord: 50,
            abs_width: 100,
            abs_height: 10,
            text_property: {
              font: 'Arial',
              font_size: 11,
              font_color: '000000',
              is_bold: false,
              is_italic: false,
            },
          },
        ],
        image_fields: [],
        date_fields: [],
        check_boxes: [],
        radio_groups: [],
      },
    },
    {
      action_type: 'SIGN',
      signing_order: 1,
      // recipient_name: 'R3',
      role: '3',
      // recipient_email: '0to1official@gmail.com',
      recipient_phonenumber: '',
      recipient_countrycode: '',
      private_notes: 'Please get back to us for further queries',
      verify_recipient: false,
      verification_type: 'EMAIL',
      deleted_fields: [],
      deleted_radio_fields: [],
      fields: {
        text_fields: [
          {
            field_type_name: 'Email',
            field_name: 'Email',
            // document_id: '57265000000034044',
            is_mandatory: true,
            page_no: 0,
            x_coord: 56,
            y_coord: 100,
            abs_width: 100,
            abs_height: 10,
            text_property: {
              font: 'Arial',
              font_size: 11,
              font_color: '000000',
              is_bold: false,
              is_italic: false,
            },
          },
        ],
        image_fields: [],
        date_fields: [],
        check_boxes: [],
        radio_groups: [],
      },
    },
  ],
};

@Injectable()
export class AddEsignTagService {
  constructor(private readonly axiosService: AxiosService) {}

  async addSignTag(data: AddEsignTag) {
    const { template_id, role1, role2, role3 } = data || {};
    if (!template_id || typeof template_id !== 'string') {
      throw new BadRequestException('Required field template_id is missing');
    }
    if (!role1 || !role1.name || !role1.email || typeof role1 !== 'object') {
      throw new BadRequestException(
        'Invalid role1 object or missing name/email',
      );
    }
    if (!role2 || !role2.name || !role2.email || typeof role2 !== 'object') {
      throw new BadRequestException(
        'Invalid role2 object or missing name/email',
      );
    }
    if (!role3 || !role3.name || !role3.email || typeof role3 !== 'object') {
      throw new BadRequestException(
        'Invalid role3 object or missing name/email',
      );
    }

    if (!fs.existsSync(`${template_id}.json`))
      throw new BadRequestException(
        `No template found with template id: ${template_id}`,
      );

    // Finding template update data in json file that was saved during upload
    const file = fs.readFileSync(`${template_id}.json`, 'utf-8');
    const fileObjData = JSON.parse(file);
    const uploadedTemplateData = fileObjData.upload;

    // Getting 0th documents's id
    const document_id =
      uploadedTemplateData.templates?.document_fields?.[0]?.document_id;

    const axiosInstance = this.axiosService.getAxiosInstance();
    templatesObj.document_fields[0].document_id = document_id;
    templatesObj.actions.forEach((action, index) => {
      const role = `role${index + 1}`;
      const recipient_name = data[role]?.name;
      const recipient_email = data[role]?.email;
      const fields = templatesObj.actions[index].fields;
      templatesObj.actions[index] = {
        ...action,
        role: role,
        recipient_name,
        recipient_email,
        fields: {
          ...fields,
          text_fields: fields.text_fields.map((item) => ({
            ...item,
            document_id,
          })),
        },
      };
    });

    const formData = new FormData();
    formData.append('data', JSON.stringify({ templates: templatesObj }));
    try {
      const response = await axiosInstance.put(
        `templates/${template_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (!template_id || !document_id)
        throw new InternalServerErrorException(
          'Internal Server Error occurred',
        );

      // Saving response back to JSON file
      fs.writeFileSync(
        `${template_id}.json`,
        JSON.stringify({ ...fileObjData, tag: response.data }, null, 2),
      );

      // Returning formated data
      const actions = response.data.templates.actions;
      return response.data;
    } catch (error) {
      console.log(error, 'Error while adding e tag');
      throw error.message;
    }
  }
}

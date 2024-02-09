import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axiosinstance.service';
import * as fs from 'fs';

interface DocumentInfo {
  template_id: string;
  document_id: string;
  template_name: string;
  role1: RoleInfo;
  role2: RoleInfo;
  role3: RoleInfo;
}

interface RoleInfo {
  name: string;
  email: string;
}
const signObj = {
  templates: {
    field_data: {
      field_text_data: {},
      field_boolean_data: {},
      field_date_data: {},
    },
    actions: [
      {
        action_id: '57265000000034060',
        action_type: 'VIEW',
        recipient_name: 'R',
        role: '1',
        recipient_email: 'kumar.akumar.amresh@gmail.com',
        recipient_phonenumber: '',
        recipient_countrycode: '',
        private_notes: '',
        verify_recipient: false,
        // verification_type: 'EMAIL',
      },
      {
        action_id: '57265000000034062',
        action_type: 'SIGN',
        recipient_name: 'R2',
        role: '2',
        recipient_email: 'amreshkmrsingh@hotmail.com',
        recipient_phonenumber: '',
        recipient_countrycode: '',
        private_notes: '',
        verify_recipient: false,
        // verification_type: 'EMAIL',
      },
      {
        action_id: '57265000000034044',
        action_type: 'SIGN',
        recipient_name: 'R3',
        role: '3',
        recipient_email: '0to1official@gmail.com',
        recipient_phonenumber: '',
        recipient_countrycode: '',
        private_notes: '',
        verify_recipient: false,
        // verification_type: 'EMAIL',
      },
    ],
    notes: '',
  },
};

@Injectable()
export class EsignService {
  constructor(private readonly axiosService: AxiosService) {}

  async sign(template_id: string) {
    if (!template_id)
      throw new BadRequestException('Required field template_id is missing');
    if (!fs.existsSync(`${template_id}.json`))
      throw new BadRequestException(
        `No template found with template id: ${template_id}`,
      );
    const file = fs.readFileSync(`${template_id}.json`, 'utf-8');
    const fileObjData = JSON.parse(file);
    const actions = fileObjData.tag.templates.actions;
    const axiosInstance = this.axiosService.getAxiosInstance();
    signObj.templates.actions.forEach((action, index) => {
      const actionObject: any = Object.keys(action).reduce(
        (acc, key) => ({ ...acc, [key]: actions[index]?.[key] || action[key] }),
        {},
      );
      signObj.templates.actions[index] = actionObject;
    });

    try {
      const response = await axiosInstance.post(
        `templates/${template_id}/createdocument?is_quicksend=true`,
        signObj,
      );
      // Saving response back to JSON file
      fs.writeFileSync(
        `${template_id}.json`,
        JSON.stringify({ ...fileObjData, sign: response.data }, null, 2),
      );
      const request_status = response.data?.requests?.request_status;
      if (request_status) {
        return `Request for the document signature is ${request_status}`;
      } else {
      }
    } catch (error) {
      console.log(error, 'upload file service');
      throw error.message;
    }
  }
}

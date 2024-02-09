import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AddEsignTagService } from './tag.service';
import * as fs from 'fs';

const addEsignTagMockData = {
  template_id: '57265000000033993',
  role1: { name: '', email: '' },
  role2: { name: '', email: '' },
  role3: { name: '', email: '' },
};

const mockAxiosService = {
  getAxiosInstance: jest.fn(() => ({
    put: jest.fn().mockResolvedValue({ data: { templates: { actions: [] } } }),
  })),
};

jest.mock('../axios/axiosinstance.service', () => ({
  AxiosService: jest.fn(() => mockAxiosService),
}));
jest.mock('fs');
// jest.mock('fs', () => ({
//   // existsSync: jest.fn().mockReturnValue(true),
//   existsSync: jest.fn(),
//   readFileSync: jest.fn().mockReturnValue(
//     JSON.stringify({
//       upload: {
//         templates: {
//           document_fields: [{ document_id: '57265000000034044' }],
//         },
//       },
//     }),
//   ),
//   writeFileSync: jest.fn(),
// }));

describe('AddEsignTagService', () => {
  let service: AddEsignTagService;

  beforeEach(() => {
    service = new AddEsignTagService(mockAxiosService as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addSignTag', () => {
    it('should throw BadRequestException if template_id is missing', async () => {
      await expect(service.addSignTag({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if role1 is missing or invalid', async () => {
      await expect(service.addSignTag(addEsignTagMockData)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should throw BadRequestException if role2 is missing or invalid', async () => {
      await expect(service.addSignTag(addEsignTagMockData)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should throw BadRequestException if role3 is missing or invalid', async () => {
      await expect(service.addSignTag(addEsignTagMockData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if no template found with provided template_id', async () => {
      jest.spyOn(require('fs'), 'existsSync').mockReturnValueOnce(false);
      await expect(
        service.addSignTag({
          ...addEsignTagMockData,
          template_id: 'random',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if an error occurred during axios request', async () => {
      jest.spyOn(mockAxiosService, 'getAxiosInstance').mockReturnValueOnce({
        put: jest.fn().mockRejectedValue(new Error('Some axios error')),
      });
      await expect(
        service.addSignTag({
          ...addEsignTagMockData,
          template_id: '57265000000033993',
          role1: { name: 'test', email: 'test@example.com' },
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});

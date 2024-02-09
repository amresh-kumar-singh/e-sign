import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { AxiosService } from '../axios/axiosinstance.service';
import * as fs from 'fs';

// Mocking dependencies
const mockAxiosService = {
  getAxiosInstance: jest.fn(() => ({
    post: jest.fn().mockResolvedValue({
      data: {
        templates: {
          template_id: '123',
          template_name: 'Test Template',
          document_fields: [{ document_id: '456' }],
        },
      },
    }),
  })),
};

jest.mock('../axios/axiosinstance.service', () => ({
  AxiosService: jest.fn(() => mockAxiosService),
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue('file data'),
  writeFileSync: jest.fn(),
}));

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    service = new UploadService(mockAxiosService as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should throw BadRequestException if file is not provided', async () => {
      await expect(service.uploadFile(undefined)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should save response data to JSON file with template_id as file name', async () => {
      const file = {
        path: 'test/path',
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
      };
      await service.uploadFile(file as any);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '123.json',
        expect.stringContaining('"template_id": "123"'),
      );
    });

    it('should return important data from response', async () => {
      const file = {
        path: 'test/path',
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
      };
      const result = await service.uploadFile(file as any);
      expect(result).toEqual({
        template_id: '123',
        document_id: '456',
        template_name: 'Test Template',
      });
    });
  });
});

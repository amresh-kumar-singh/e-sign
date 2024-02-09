import { BadRequestException } from '@nestjs/common';
import { EsignService } from './sign.service';
import { AxiosService } from '../axios/axiosinstance.service';
import * as fs from 'fs';

const mockAxiosService = {
  getAxiosInstance: jest.fn(() => ({
    post: jest.fn().mockResolvedValue({
      data: { templates: { request_status: 'pending' } },
    }),
  })),
};

jest.mock('../axios/axiosinstance.service', () => ({
  AxiosService: jest.fn(() => mockAxiosService),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest
    .fn()
    .mockReturnValue(JSON.stringify({ tag: { templates: { actions: [] } } })),
  writeFileSync: jest.fn(),
}));

describe('EsignService', () => {
  let service: EsignService;

  beforeEach(() => {
    service = new EsignService(mockAxiosService as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sign', () => {
    it('should throw BadRequestException if template_id is missing', async () => {
      await expect(service.sign('')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if template file does not exist', async () => {
      jest.spyOn(require('fs'), 'existsSync').mockReturnValueOnce(false);
      await expect(service.sign('57265000000033993')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});

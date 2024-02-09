import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { map } from 'rxjs';

// @Injectable()
// export class EsignService {
//   constructor(private readonly httpService: HttpService) {}
//   async eSign() {
//     const data = await this.httpService
//       .get('https://jsonplaceholder.typicode.com/todos/1')
//       .toPromise();

//     console.log('data,', data.data);
//     return data.data;
//   }
// }

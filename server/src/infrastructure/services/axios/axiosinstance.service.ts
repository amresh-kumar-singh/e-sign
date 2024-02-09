import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { error } from 'console';

@Injectable()
export class AxiosService {
  private readonly axiosInstance: AxiosInstance;
  private accessToken;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.ZOHO_API_URL,
      timeout: 5000,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
    });
    this.setAxiosInterceptor();
    this.accessToken = null;
  }

  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  async getAccessToken() {
    try {
      const response = await axios.post(
        `${process.env.ZOHO_API_OAUTH_URL}/token?refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&redirect_uri=${process.env.ZOHO_API_REDIRECT_URI}&grant_type=${process.env.ZOHO_API_GRANT_TYPE}`,
      );
      //   checking if access token in response else throwing error
      if (response.data?.access_token) return response.data.access_token;
      throw new Error('No access token found in response!');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      throw error;
    }
  }

  private setAxiosInterceptor() {
    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (!this.accessToken) {
          this.accessToken = await this.getAccessToken();
        }
        if (this.accessToken) {
          config.headers['Authorization'] =
            `Zoho-oauthtoken ${this.accessToken}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );

    //   Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const request = error.config;
        if (
          error.response.status === 401 &&
          error.response.data.code === 9041 &&
          !request._retry
        ) {
          request._retry = true;
          const access_token = await this.getAccessToken();
          this.accessToken = access_token;
          axios.defaults.headers.common['Authorization'] =
            `Zoho-oauthtoken ${access_token}`;
          return this.axiosInstance(request);
        }
        return Promise.reject(error);
      },
    );
  }
}

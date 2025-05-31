import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, options?: AxiosRequestConfig<any>): Promise<T> {
    const response: AxiosResponse<T> = await this.httpService.axiosRef.get(
      url,
      options,
    );
    return response.data;
  }

  async post<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.httpService.axiosRef.post(
      url,
      data,
      options,
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.httpService.axiosRef.put(
      url,
      data,
      options,
    );
    return response.data;
  }
}

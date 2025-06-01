import { ProviderTypes } from '../types';

export class CallSmsProviderDto {
  processId: string;
  campaignCode: number;
  messageCode: number;
  messageDetail: string;
  messageProvider: ProviderTypes;
  phoneNumber: string;
}

export interface ControllerResponse<T = any> {
  responseCode: string;
  message?: string;
  data?: T;
}

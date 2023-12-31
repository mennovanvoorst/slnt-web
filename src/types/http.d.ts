export interface HttpRequest {
  endpoint: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export interface HttpResponse {
  success: boolean;
  payload: any;
}

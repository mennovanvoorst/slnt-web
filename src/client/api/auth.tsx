import config from "@config";
import { HttpResponse } from "@interfaces/http";
import { get } from "@utils/http";

export const authenticate = (strategy: string): void => {
  window.location.href = `${config.server_url}${config.api.prefix}/v1/auth/authenticate/${strategy}`;
};

export const unlink = async (strategy: string): Promise<HttpResponse> =>
  get({ endpoint: `/v1/auth/unlink/${strategy}` });

export const fetchToken = async (strategy: string): Promise<HttpResponse> =>
  get({ endpoint: `/v1/auth/authenticate/${strategy}/token` });

export const logout = async (): Promise<HttpResponse> =>
  get({ endpoint: `/v1/auth/logout` });

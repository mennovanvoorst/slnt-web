import { HttpResponse } from "@interfaces/http";
import { get, post } from "@utils/http";
import config from "@config";
import { Settings } from "@interfaces/settings";

export const authUser = async (): Promise<HttpResponse> =>
  get({ endpoint: `/v1/user/auth` });

export const connectUser = (provider: string): void => {
  window.location.href = `${config.server_url}${config.api.prefix}/v1/user/connect/${provider}`;
};

export const fetchUserSettings = async (): Promise<HttpResponse> =>
  get({ endpoint: `/v1/user/settings` });

export const updateUserSettings = async (
  data: Settings
): Promise<HttpResponse> =>
  post({ endpoint: `/v1/user/settings/update`, data });

export const deleteUser = async (): Promise<HttpResponse> =>
  post({ endpoint: `/v1/user/delete` });

export interface User {
  id: number;
  name: string;
  avatar: string;
  provider: string;
  providers: Providers;
}

export interface Providers {
  twitch?: {
    [key: string]: Provider;
  };
  youtube?: {
    [key: string]: Provider;
  };
  spotify?: {
    [key: string]: Provider;
  };
}

export interface Provider {
  id: number;
  displayName: string;
  token: string;
  refreshToken?: string;
  expiresIn: string;
}

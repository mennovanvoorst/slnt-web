import { User } from "@interfaces/user";

declare global {
  interface Window {
    Spotify: any;
  }
  declare namespace Express {
    interface Request {
      user: any;
    }
  }
}

export {};

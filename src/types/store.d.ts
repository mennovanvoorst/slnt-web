import { Dispatch } from "react";
import { User } from "@interfaces/user";
import { Session } from "@interfaces/session";
import { Playlist } from "@interfaces/playlist";
import { Settings } from "@interfaces/settings";

export interface State {
  authenticated: boolean;
  user: User | null;
  userPlaylists: Playlist[] | null;
  userSettings: Settings | null;
  session: Session | null;
}

export interface Action {
  type: string;
  payload: any;
}

export interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

export interface ProviderProps {
  children: React.ReactNode;
}

import React, { createContext, useContext, useReducer } from "react";
import actions from "@store/store-actions";

import { Context, State, Action, ProviderProps } from "@interfaces/store";

const initialState: State = {
  authenticated: false,
  user: null,
  userPlaylists: null,
  userSettings: null,
  session: {
    isActive: false,
    hosts: [],
    playlist: [
      {
        id: "spotify:track:1v2gz3Z8jdh8LzhM8j1sdc",
        title: "Tightrope",
        duration: 211,
        channel: "Kwaku Asante",
        thumbnails: {
          default: "",
          medium: "",
          high: ""
        }
      }
    ],
    isPlaying: true,
    delay: 0,
    timestamp: 0
  }
};
const StoreContext = createContext<Context>({
  state: initialState,
  dispatch: () => undefined
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.AUTHENTICATE:
      if (typeof action.payload !== "boolean") return state;

      return {
        ...state,
        authenticated: action.payload
      };
    case actions.USER_AUTHENTICATED:
      return {
        ...state,
        user: action.payload
      };
    case actions.SESSION_CREATED:
      return {
        ...state,
        session: { ...action.payload }
      };
    case actions.SESSION_STOPPED:
      return {
        ...state,
        session: { ...action.payload }
      };
    case actions.SESSION_JOINED:
      return {
        ...state,
        session: { ...action.payload }
      };
    case actions.SESSION_UPDATED:
      return {
        ...state,
        session: { ...action.payload }
      };
    case actions.SESSION_FETCHED:
      return {
        ...state,
        session: { ...action.payload }
      };
    case actions.USER_UPDATE_PLAYLISTS:
      return {
        ...state,
        userPlaylists: [...action.payload]
      };
    case actions.USER_UPDATE_SETTINGS:
      return {
        ...state,
        userSettings: { ...action.payload }
      };
    case actions.PLAYER_STATE_CHANGE:
      return {
        ...state,
        session: {
          ...state.session,
          isPlaying: action.payload.isPlaying,
          timestamp: action.payload.timestamp
        }
      };
    case actions.PLAYER_PROGRESS_CHANGE:
      return {
        ...state,
        session: {
          ...state.session,
          timestamp: action.payload.timestamp
        }
      };
    case actions.PLAYLIST_UPDATED:
      return {
        ...state,
        session: {
          ...state.session,
          playlist: action.payload.playlist
        }
      };
    case actions.SET_DELAY:
      return {
        ...state,
        session: {
          ...state.session,
          delay: action.payload
        }
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): Context => useContext(StoreContext);

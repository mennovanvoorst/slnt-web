import action from "@store/store-actions";
import { Dispatch } from "react";

const sessionCreated = (payload: any, dispatch: Dispatch<any>): void => {
  dispatch({ type: action.SESSION_CREATED, payload });
};

const sessionFetched = (payload: any, dispatch: Dispatch<any>): void => {
  if (!payload) return;

  dispatch({ type: action.SESSION_FETCHED, payload });
};

const sessionStopped = (payload: any, dispatch: Dispatch<any>): void => {
  dispatch({ type: action.SESSION_STOPPED, payload });
};

const sessionJoined = (payload: any, dispatch: Dispatch<any>): void => {
  if (!payload) return;

  dispatch({ type: action.SESSION_JOINED, payload });
};

const sessionUpdated = (payload: any, dispatch: Dispatch<any>): void => {
  dispatch({ type: action.SESSION_UPDATED, payload });
};

const sessionResynced = (payload: any, dispatch: Dispatch<any>): void => {
  dispatch({ type: action.SESSION_UPDATED, payload });
};

export default {
  sessionCreated,
  sessionStopped,
  sessionJoined,
  sessionUpdated,
  sessionFetched,
  sessionResynced
};

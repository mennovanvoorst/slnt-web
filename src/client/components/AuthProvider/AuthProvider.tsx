import React, { ReactNode, useEffect, useState } from "react";
import action from "@store/store-actions";
import { useStore } from "@store/store";
import { authUser } from "@client/api/user";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { state, dispatch } = useStore();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchAuthentication = async (): Promise<void> => {
      const res = await authUser();

      if (res.success) {
        dispatch({ type: action.AUTHENTICATE, payload: true });
        dispatch({
          type: action.USER_AUTHENTICATED,
          payload: res.payload
        });
      } else {
        dispatch({ type: action.AUTHENTICATE, payload: false });
      }

      setFetched(true);
    };

    fetchAuthentication();
  }, [dispatch]);

  if (!fetched) return <></>;

  return <>{children}</>;
};

export default AuthProvider;

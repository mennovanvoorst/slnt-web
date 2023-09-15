import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "@store/store";

const RequireAuth = ({ children }: { children: JSX.Element }): ReactElement => {
  const { state } = useStore();

  if (!state.authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;

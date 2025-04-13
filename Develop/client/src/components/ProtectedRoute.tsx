import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

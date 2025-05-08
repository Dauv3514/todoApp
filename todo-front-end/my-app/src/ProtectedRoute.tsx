
import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = (props: any) => {
  const token = localStorage.getItem("token");
  if (token == undefined) {
    return <Navigate to="/login"></Navigate>;
  }

  return props.children;
};

export default ProtectedRoute;
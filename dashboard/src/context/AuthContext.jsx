import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
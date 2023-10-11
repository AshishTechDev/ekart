import { createContext, useState, useMemo } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  role: "",
  loginHandler: () => {},
  logoutHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  const token = useMemo(() => {
    return localStorage.getItem("token");
  }, [isLoggedIn]);

  const role = useMemo(() => {
    return localStorage.getItem("role");
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        role,
        loginHandler,
        logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

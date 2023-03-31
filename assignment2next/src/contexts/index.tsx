import { API } from "@/libs/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import React from "react";
import jwt_decode from "jwt-decode";

type GlobalContextType = {
  isLogin: Boolean;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout: () => void;
  accessToken: React.MutableRefObject<string | null | undefined>;
  tokenPayload: TokenPayload | null;
};

type TokenPayload = {
  email: string;
  exp: number;
  iat: number;
  permission: ("READ" | "WRITE")[];
  username: string;
};
const globalContext = createContext<GlobalContextType>({
  isLogin: null!,
  login: null!,
  logout: null!,
  tokenPayload: null!,
  accessToken: null!,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = useRef<string | null>();
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);

  const login = async (usernameOrEmail: string, password: string) => {
    const { token, success } = await API.login(usernameOrEmail, password);
    if (success && token) {
      setIsLogin(true);
      localStorage.setItem("accessToken", token);
      accessToken.current = token;
      decodeToken(token);
    }

    return success
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.clear();
    accessToken.current = null;
  };

  function decodeToken(token: string) {
    const decoded = jwt_decode(token) as TokenPayload;
    const now = new Date();
    const secondsSinceEpoch = Math.round(now.getTime() / 1000);
    if (secondsSinceEpoch > decoded.exp) {
      return logout();
    }
    setTokenPayload(decoded);
  }

  useEffect(() => {
    accessToken.current = localStorage.getItem("accessToken");
    if (accessToken.current) {
      setIsLogin(true);
      decodeToken(accessToken.current);
    }
  }, []);

  return (
    <globalContext.Provider
      value={{ isLogin, login, logout, tokenPayload, accessToken }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);

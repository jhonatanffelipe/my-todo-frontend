import React, { createContext, HTMLAttributes, useCallback, useContext, useState } from "react";
import { IAuthState } from "../interfaces/IAthState";
import { IAuthToken } from "../interfaces/IAuthToken";
import { IAuthUser } from "../interfaces/IAuthUser";
import { ISignInCredentials } from "../interfaces/ISignInCredentials";

import api from "../services/api";

interface IAuthProvider extends HTMLAttributes<HTMLElement> {}

interface IAuthContext {
  user: {
    id: string;
    name: string;
    avatar_url: string;
    email: string;
  };
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  singOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("@MyTodo:token");
    const user = localStorage.getItem("@MyTodo:user");

    if (token && user) {
      const tokenPased: IAuthToken = JSON.parse(token);
      const userPased: IAuthUser = JSON.parse(user);

      api.defaults.headers.authorization = `Bearer ${tokenPased.accessToken}`;
      return { token: tokenPased, user: userPased };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const response = await api.post("auth", {
      email,
      password,
    });

    const { token, user }: IAuthState = response.data;

    localStorage.setItem("@MyTodo:token", JSON.stringify(token));
    localStorage.setItem("@MyTodo:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token.accessToken}`;

    setAuthData({ token, user });
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem("@MyTodo:token");
    localStorage.removeItem("@MyTodo:user");

    setAuthData({} as IAuthState);
  }, []);

  return <AuthContext.Provider value={{ user: authData.user, signIn, singOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };

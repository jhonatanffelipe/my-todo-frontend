import React, { createContext, HTMLAttributes, useCallback, useContext, useState } from "react";

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

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthToken {
  accessToken: string;
  refreshToken: string;
  iat: number;
  exp: number;
}

interface IAuthUser {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface IAuthState {
  token: IAuthToken;
  user: IAuthUser;
}

interface IAuthState {
  token: {
    accessToken: string;
    refreshToken: string;
    iat: number;
    exp: number;
  };
  user: {
    id: string;
    name: string;
    avatar_url: string;
    email: string;
  };
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthState>(() => {
    const token: IAuthToken = JSON.parse(localStorage.getItem("@MyTodo:token") || "");
    const user: IAuthUser = JSON.parse(localStorage.getItem("@MyTodo:user") || "");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token.accessToken}`;
      return { token, user };
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

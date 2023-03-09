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

interface IAuthState {
  token: string;
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
    const token = localStorage.getItem("@MyTodo:token");
    const user = localStorage.getItem("@MyTodo:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const response = await api.post("auth", {
      email,
      password,
    });

    const { token, user }: IAuthState = response.data;

    localStorage.setItem("@MyTodo:token", token);
    localStorage.setItem("@MyTodo:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

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

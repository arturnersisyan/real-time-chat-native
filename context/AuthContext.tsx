import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authentificated: boolean | null };
  onRegister?: (
    email: string,
    password: string,
    name: string,
    age: number
  ) => Promise<any>;
  onLogIn?: (email: string, password: string) => Promise<any>;
  onLogOut?: () => Promise<any>;
}

const TOKEN_KEY = "jwt";
export const API_URL = "localhost:3000";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authentificated: boolean | null;
  }>({ token: null, authentificated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItem(TOKEN_KEY);
      console.log("stored: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authentificated: true,
        });
      }
    };

    loadToken();
  });

  const signUp = async (
    email: string,
    password: string,
    name: string,
    age: number
  ) => {
    try {
      return await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        age,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log(result);

      setAuthState({
        token: result.data.access_token,
        authentificated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authentificated: false,
    });
  };

  const value = {
    onRegister: signUp,
    onLogIn: signIn,
    onLogOut: signOut,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

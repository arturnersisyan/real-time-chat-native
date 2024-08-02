import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface AuthProps {
  token: string | null;
  authentificated: boolean;
  onRegister?: (
    email: string,
    password: string,
    name?: string,
    age?: number
  ) => Promise<any>;
  onLogIn?: (email: string, password: string) => Promise<any>;
  onLogOut?: () => Promise<any>;
}

const TOKEN_KEY = "jwt";
export const API_URL = "http://localhost:3000/";
export const AuthContext = createContext<AuthProps>({
  token: null,
  authentificated: false,
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>('')
  const [authentificated, setAuthentificated] = useState<boolean>(false)

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItem(TOKEN_KEY);
      console.log("stored: ", token);

      console.log("token: " +!!token)
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setToken(token);
        setAuthentificated(true)
      }
    };

    loadToken();
    console.log("authentificated: " + authentificated);
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name?: string,
    age?: number
  ) => {
    try {
      console.log("response")
      return await axios.post(`http://192.168.10.131:3000/auth/signup`, {
        name,
        email,
        age,
        password,
      });
    } catch (e) {
      console.log(e)
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await axios.post("http://192.168.10.131:3000/auth/login", {
        email,
        password,
      });

      console.log(result.data.access_token);

      setToken(result.data.access_token);
      setAuthentificated(true);

      console.log("TokenIn: " + token)
      console.log("authIn: " + authentificated);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);
      return result;
    } catch (e) {
      console.log("error: " + e);
      console.log("error 2: " + (e as any).response.message);
      return { error: true, msg: (e as any).response.data.message };
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setToken('');
    setAuthentificated(false);

    console.log("Auth Out: " + authentificated)
    console.log("Log Out")
  };

  const value = {
    onRegister: signUp,
    onLogIn: signIn,
    onLogOut: signOut,
    token: token,
    authentificated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

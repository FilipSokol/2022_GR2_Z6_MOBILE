import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, SetStateAction, useEffect } from 'react';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from './config';

export type responseProps = {
  [key: string]: string;
};

export interface userDataProps {
  email: string;
  password: string;
}

export const AuthContext = createContext('');

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<responseProps | string | null>(null);

  const login = async (data: userDataProps) => {
    const email = data.email;
    const password = data.password;
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/api/account/login`,
        {
          email,
          password,
        },
        { timeout: 5000 },
      )
      .then((response) => {
        setUserToken(response.data['token']);
        AsyncStorage.setItem('userToken', response.data['token']);
        const decoded = jwt_decode<responseProps>(response.data['token']);
        setUserInfo(decoded);
        AsyncStorage.setItem('userInfo', JSON.stringify(decoded));
      })
      .catch((e) => console.log('catch', e.toJSON()));

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      let userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log('isloggedIn error', e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

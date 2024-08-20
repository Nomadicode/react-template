'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

export type AuthContextType = {
  authToken: string
  refreshToken: string
  login: (authToken: string, refreshToken: string) => void
  logout: () => void
  userInfo: any
  profile: any
};

const defaultAuthContext = {
  authToken: '',
  refreshToken: '',
  login: (authToken: string, refreshToken: string) => {},
  logout: () => {},
  userInfo: { firstName: '', lastName: '', email: '', username: '', id: '' },
  profile: { defaultCountry: '', defaultLanguage: 'en', profilePicture: ''}
};

const AuthContext = createContext(defaultAuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token', 'refresh-token'])
  const [authToken, setAuthToken] = useState<string>(cookies['auth-token'] || null)
  const [refreshToken, setRefreshToken] = useState<string>(cookies['refresh-token'] || null)
  const [userInfo, setUserInfo] = useState<any>({})
  const [profile, setProfile] = useState<any>({})

  const login = (authToken: string, refreshToken: string) => {
    setAuthToken(authToken)
    setRefreshToken(refreshToken)
    const expires = new Date();
    expires.setHours(expires.getHours() + 2); // Set the expiration date to 2 hours from now
    setCookie('auth-token', authToken, { path: '/', expires, sameSite: 'lax' });
    setCookie('refresh-token', refreshToken, { path: '/', expires, sameSite: 'lax' });
  }

  const fetchUserInfo = () => {
    if (authToken) {
        console.log("Fetching User Data")
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [authToken])

  const logout = () => {
    console.log("Logging out user")
    setAuthToken('')
    setRefreshToken('')
    removeCookie('auth-token', { path: '/' })
    removeCookie('refresh-token', { path: '/' })
  }

  return (
    <AuthContext.Provider value={{ authToken, userInfo, profile, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

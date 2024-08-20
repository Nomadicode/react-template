'use client'

import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie'

type Props = {
  deviceLanguage: string | null;
  children: React.ReactNode[] | React.ReactNode;
};

export type AppStateContextType = {
  availableLocales: any,
  locale: string,
  setLocale: (locale: string) => void
};

const defaultAppStateContext = {
    availableLocales: {},
    locale: '',
    setLocale: (locale: string) => {},
};

const AppStateContext = createContext(defaultAppStateContext);

export const AppStateContextProvider = ({ deviceLanguage, children }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['app-state-locale'])
  const [availableLocales, setAvailableLocales] = useState<any>({
    en: 'English',
    es: 'Español'
  })
  const [locale, setLocale] = useState<string>(cookies['app-state-locale'] || deviceLanguage || 'en')

  return (
    <AppStateContext.Provider value={{ availableLocales, locale, setLocale }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppStateContext = () => useContext(AppStateContext)

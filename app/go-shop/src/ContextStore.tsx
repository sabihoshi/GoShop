import React, { useState, useEffect, useMemo } from 'react';

interface UserData {
  name: string;
  age: number;
  avatar: string;
  _id: number;
  // Add any other properties you need for the userData object
}

export interface ContextValue {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  children?: React.ReactNode;
}

interface ContextStoreProps {
    children?: React.ReactNode;
  }

export const Context = React.createContext<ContextValue | null>(null);

export const ContextStore: React.FC<ContextStoreProps> = ({ children }) => {
  let initialValue: UserData | null = null;
  const [userData, setUserData] = useState<UserData | null>(initialValue);

  useEffect(() => {
    fetch(`/auth/getUser`)
      .then(res => res.json())
      .then(res => {
        setUserData(res.user);
      });
  }, []);

  const providerValue: ContextValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  );
};
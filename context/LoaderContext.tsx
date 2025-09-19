// context/LoaderContext.tsx
import React, { createContext, useState } from 'react';

interface ILoader {
  show: boolean;
  setShow: (v: boolean) => void;
}

export const LoaderContext = createContext<ILoader>({ show: false, setShow: () => {} });

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  return <LoaderContext.Provider value={{ show, setShow }}>{children}</LoaderContext.Provider>;
};

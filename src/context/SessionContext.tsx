import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface SessionContextType {
  username: string;
  score: number;
  setUsername: Dispatch<SetStateAction<string>>;
  setScore: Dispatch<SetStateAction<number>>;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState<number>(0);

  return (
    <SessionContext.Provider value={{ username, score, setUsername, setScore }}>
      {children}
    </SessionContext.Provider>
  );
};

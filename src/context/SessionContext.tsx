import React, { createContext, useState, ReactNode } from 'react';

interface SessionContextType {
  username: string;
  score: number;
  setUsername: (username: string) => void;
  setScore: (score: number) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);

  return (
    <SessionContext.Provider value={{ username, score, setUsername, setScore }}>
      {children}
    </SessionContext.Provider>
  );
};

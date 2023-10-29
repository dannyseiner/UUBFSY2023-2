import React, { createContext, useState } from "react";
import { User } from "../types/user";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

const defaultContextData: UserContextType = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser: setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

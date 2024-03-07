// UserContext.js
import { createContext, useContext } from 'react';

export const UserContext = createContext({
  user: {},
  setUser: () => {}, 
  admin: {},
  setAdmin: ()=>{},
});

export const UserProvider = UserContext.Provider;

export default function useUser() {
  return useContext(UserContext);
}
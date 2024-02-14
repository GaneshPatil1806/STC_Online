// userContext.js
import { createContext, useContext } from 'react';

export const UserContext = createContext({
  user: {
    access_token: '',
    username: '',
    type:''
  },
  setUser: () => {}, 
});

export const UserProvider = UserContext.Provider;

export default function useUser() {
  return useContext(UserContext);
}
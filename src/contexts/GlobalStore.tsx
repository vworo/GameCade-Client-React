'use client';

import { createContext, useContext, useState } from 'react';

const EMPTY_USER = {
  id: 0,
  displayName: 'Not logged in',
}

const GlobalContext = createContext({
  user: EMPTY_USER,
  setUser: () => {}
});

export function GlobalStore({ children }) {
    const [user, setUser] = useState(EMPTY_USER)
    
    const globalState = {
        user,
        setUser: (user) => {
          // * Conditional logic
          let userToSet = {
            uid: user.uid,
            displayName: user.isAnonymous ? 'Guest' : user.displayName,
          };

          console.log('Setting user to global state:', userToSet);

          return setUser(userToSet);
        }
    }

  return (
    <GlobalContext.Provider value={ globalState }>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
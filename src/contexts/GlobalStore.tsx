'use client';

import { createContext, useContext, useState } from 'react';

import ChatBox from '@/components/ChatBox';
import Sidebar from '@/components/sidebar/Sidebar';


type User = {
  id?: number;
  displayName?: string;
}

type InputUser = {
  uid?: number;
  isAnonymous?: boolean;
  displayName?: string;
}

export const EMPTY_USER: User = {
  id: undefined,
  displayName: 'Not logged in',
}

const GlobalContext = createContext({
  user: EMPTY_USER,
  setUser: (user: InputUser) => {}
});

export function GlobalStore({ children }: Readonly<{
  children: React.ReactNode;
}>) {
    const [user, setUser] = useState(EMPTY_USER)
    
    const globalState = {
        user,
        setUser: (user: InputUser) => {
          // * Conditional logic
          let userToSet: User = {
            id: user.uid,
            displayName: user.isAnonymous ? 'Guest' : user.displayName,
          };

          console.log('Setting user to global state:', userToSet);

          return setUser(userToSet);
        }
    }

  return (
    <GlobalContext.Provider value={ globalState }>
      <div className="page flex flex-row min-h-svh">
        { user.id && <Sidebar /> }
        <div className={'pageContent flex flex-wrap flex-1 w-full ' + (user.id && 'sidebarAvailable') }>
          { children }
        </div>
        { user.id && <ChatBox /> }
      </div>
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
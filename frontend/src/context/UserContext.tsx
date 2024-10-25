import React, { createContext, ReactNode, useState } from 'react';

import { Me } from 'types';

type UpdateMeType = React.Dispatch<Me>;

type Props = {
  children: ReactNode;
};

const defaultSetUser: UpdateMeType = () => null;

export const UserContext = createContext({
  me: null as Me,
  setMe: defaultSetUser,
});

export default function UserProvider({ children }: Props) {
  const [me, setMe] = useState(null);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={{ me, setMe }}>{children}</UserContext.Provider>;
}

import { useContext } from 'react';

import { UserContext } from 'context/UserContext';

function useUser() {
  const { me, setMe } = useContext(UserContext);
  return { me, setMe };
}

export default useUser;

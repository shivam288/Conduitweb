import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext/UserContext';

const RequireAuth = ({ children: Children }) => {
  
  const { user } = useContext(UserContext);

  if (!user.isSignedIn) return <Navigate to='/signin' />

  return Children;
}

export default RequireAuth;

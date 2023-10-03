export const saveUser = (user, setUser) => {
  localStorage.setItem('Conduit_React_userState', JSON.stringify({ ...user, isSignedIn: true }));
  setUser({ ...user, isSignedIn: true });
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('Conduit_React_userState'));
}

export const removeUser = setUser => {
  localStorage.removeItem('Conduit_React_userState');
  setUser({
    email: '',
    username: '',
    token: '',
    isSignedIn: false
  });
}

export const getToken = () => {
  return getUser() ? getUser().token : null;
}

export const getTokenConfig = () => {
  return getToken() ? {
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  } : null
}

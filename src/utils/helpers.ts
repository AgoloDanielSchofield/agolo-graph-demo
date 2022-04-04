export const getUserId = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '');
  return user && user.id;
};

export const getCurrentUserEmail = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '');
  return user && user.email;
};

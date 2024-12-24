const buttonLogout = document.querySelector('.icon__logout');

const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = '/';
};

const setEventLogout = () => {
  if (!buttonLogout) return;
  buttonLogout.addEventListener('click', handleLogout);
};

setEventLogout();

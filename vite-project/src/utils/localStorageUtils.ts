const USER_KEY = 'loggedInUser';

// Função para salvar o usuário no localStorage, incluindo o token e o userId
export const saveUserToLocalStorage = (user: { id: string; email: string; name: string; token: string }) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (user && user.email && user.name && user.token && user.id) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      console.error('Usuário inválido, não será salvo no localStorage:', user);
    }
  } else {
    console.error('LocalStorage não está disponível.');
  }
};

// Função para obter o usuário do localStorage
export const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

// Função para remover o usuário do localStorage
export const removeUserFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(USER_KEY);
    console.log('Usuário removido do localStorage');
  } else {
    console.error('LocalStorage não está disponível.');
  }
};

const USER_KEY = 'loggedInUser';

// Função para salvar o usuário no localStorage, incluindo o token
export const saveUserToLocalStorage = (user: { email: string; name: string; token: string }) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Verifica se o usuário tem valores válidos
    if (user && user.email && user.name && user.token) {
      console.log('Tentando salvar no localStorage:', user);
      localStorage.setItem(USER_KEY, JSON.stringify(user)); // Salva o usuário com o token
      console.log('Usuário salvo no localStorage:', localStorage.getItem(USER_KEY));
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
    const storedUser = localStorage.getItem(USER_KEY); // Recupera o usuário
    console.log('Usuário recuperado do localStorage:', storedUser); // Log do usuário recuperado
    return storedUser ? JSON.parse(storedUser) : null; // Verifica se o usuário existe
  }
  return null;
};

// Função para remover o usuário do localStorage
export const removeUserFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(USER_KEY); // Remove o usuário
    console.log('Usuário removido do localStorage');
  } else {
    console.error('LocalStorage não está disponível.');
  }
};

// Função para salvar o usuário logado no localStorage
export const saveUserToLocalStorage = (user: string) => {
  localStorage.setItem('loggedInUser', user)
}

// Função para obter o usuário logado do localStorage
export const getUserFromLocalStorage = (): string | null => {
  return localStorage.getItem('loggedInUser')
}

// Função para remover o usuário logado do localStorage
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('loggedInUser')
}

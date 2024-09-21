import { useState, useEffect } from 'react'
import usuario from '../assets/usuario.svg'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { CreateUser } from './userRegister'
import { useNavigate } from 'react-router-dom'
import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
} from '../utils/localStorageUtils' // Importa as funções

export function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null) // Estado para o usuário logado
  const navigate = useNavigate()

  // Função para fazer login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`)
      }

      const registeredUser = await response.json()

      // Verifica se o e-mail e a senha estão corretos
      if (
        email.trim() === registeredUser.email.trim() &&
        password.trim() === registeredUser.password.trim()
      ) {
        saveUserToLocalStorage(registeredUser.email) // Salva o usuário no localStorage
        setLoggedInUser(registeredUser.email) // Atualiza o estado para exibir o nome do usuário
        alert('Login realizado com sucesso!')
        navigate('/')
      } else {
        setError('E-mail ou senha incorretos')
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err)
      setError('Ocorreu um erro ao fazer login. Tente novamente.')
    }
  }

  // Verifica se o usuário já está logado no LocalStorage quando o componente monta
  useEffect(() => {
    const storedUser = getUserFromLocalStorage() // Obtém o usuário do localStorage
    if (storedUser) {
      setLoggedInUser(storedUser)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 bg-zinc-900">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md max-w-sm w-full flex flex-col items-center">
        <img src={usuario} alt="logo usuario" className="w-24 h-24 mb-4" />
        {loggedInUser ? (
          <h2>Bem-vindo, {loggedInUser}!</h2>
        ) : (
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-6 w-full max-w-sm"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="emailValidate">E-mail: </Label>
              <Input
                id="emailValidate"
                placeholder="e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="passwordValidation">Senha: </Label>
              <Input
                type="password"
                id="passwordValidation"
                placeholder="senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1" variant="secondary">
                    Registrar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CreateUser />
                </DialogContent>
              </Dialog>
              <Button type="submit" className="flex-1">
                Entrar
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react';
import usuario from '../assets/usuario.svg';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreateUser } from './userRegister';
import { useNavigate } from 'react-router-dom';
import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../utils/localStorageUtils'; // Funções para salvar e obter do localStorage
import { Loader } from './ui/loader'; // Componente de loading

export function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [rememberMe, setRememberMe] = useState(false); // Lembre-me
  const navigate = useNavigate();

  // Função para fazer login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ativa o estado de carregamento

    try {
      console.log('Tentando login com email:', email); // Log para verificar email
      const response = await fetch(`http://localhost:5000/api/user/${email}?password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        console.error(`Erro ao fazer a requisição: ${response.status}`);
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const registeredUser = await response.json();
      console.log('Usuário recebido do back-end:', registeredUser); // Verifica o retorno do back-end

      // Verifica se o e-mail e a senha estão corretos
      if (registeredUser.u_email === email) {
        const userInfo = { email: registeredUser.u_email, name: registeredUser.u_nome };
        console.log('Usuário a ser salvo no localStorage:', userInfo); // Log do objeto antes de salvar

        if (rememberMe) {
          saveUserToLocalStorage(userInfo); // Salva o usuário no localStorage se o checkbox estiver marcado
          console.log('Usuário salvo no localStorage:', localStorage.getItem('loggedInUser'));
        } else {
          console.log('Usuário não será salvo no localStorage porque "Lembre-se de mim" está desmarcado.');
        }

        // Redireciona para a tela de jogos após o login bem-sucedido
        navigate('/jogos', { state: { loggedInUser: registeredUser.u_nome } });
      } else {
        setError('E-mail ou senha incorretos');
      }
    } catch (err: any) {
      console.error('Erro ao fazer login:', err.message);
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Verifica se o usuário já está logado no LocalStorage quando o componente monta
  useEffect(() => {
    const storedUser = getUserFromLocalStorage(); // Obtém o usuário do localStorage
    if (storedUser) {
      console.log('Usuário recuperado do localStorage:', storedUser);
      navigate('/jogos', { state: { loggedInUser: storedUser.name } }); // Redireciona automaticamente se o usuário já estiver logado
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 bg-zinc-900">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md max-w-sm w-full flex flex-col items-center">
        <img src={usuario} alt="logo usuario" className="w-24 h-24 mb-4" />
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)} // Alterna o valor de rememberMe
            />
            <Label htmlFor="rememberMe">Lembre-se de mim</Label>
          </div>

          {loading ? (
            <Loader /> // Componente de loading
          ) : (
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
          )}
        </form>
      </div>
    </div>
  );
}

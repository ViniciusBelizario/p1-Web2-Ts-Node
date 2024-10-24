import { X } from 'lucide-react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

export function CreateUser() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores
    setSuccess(null); // Limpa mensagens de sucesso anteriores

    // Validação básica: checar se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Verificar se o campo sobrenome não está vazio
    if (!surname.trim()) {
      setError('O sobrenome é obrigatório');
      return;
    }

    // Dados que serão enviados ao back-end
    const userData = {
      name,
      surname,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao criar o usuário');
        return;
      }

      setSuccess('Usuário criado com sucesso!');
      // Limpar os campos após o sucesso
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Fecha o diálogo após o sucesso e exibe a mensagem de sucesso por 3 segundos
      setTimeout(() => {
        setSuccess(null); // Limpa a mensagem de sucesso
      }, 3000);
    } catch (error) {
      console.error('Erro ao se comunicar com o servidor:', error);
      setError('Erro ao se comunicar com o servidor');
    }
  };

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastro</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Você ainda não se cadastrou, cadastre-se para ter uma melhor experiência.
          </DialogDescription>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nameUser">Primeiro nome?</Label>
                <Input
                  id="nameUser"
                  placeholder="nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="surnameUser">Sobrenome:</Label>
                <Input
                  id="surnameUser"
                  placeholder="sobrenome"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="emailUser">E-mail:</Label>
                <Input
                  id="emailUser"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="passwordUser">Senha:</Label>
                <Input
                  id="passwordUser"
                  placeholder="senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPasswordUser">Confirme a senha:</Label>
                <Input
                  id="confirmPasswordUser"
                  placeholder="senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Exibe erro se houver */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Exibe mensagem de sucesso */}
            {success && <p className="text-green-500">{success}</p>}

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="secondary">
                  Fechar
                </Button>
              </DialogClose>
              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
}

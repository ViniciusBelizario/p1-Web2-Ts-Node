import { X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function CreateUser() {
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
            Você ainda não se cadastrou, cadastre se, para ter uma melhor
            experiencia.
          </DialogDescription>
          <form action="" className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nameUser">Pimeiro nome?</Label>
                <Input id="nameUser" placeholder="nome" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="surnameUser">Sobrenome:</Label>
                <Input id="surnameUser" placeholder="sobrenome" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="emailUser">E-mail:</Label>
                <Input id="emailUser" placeholder="email" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="passwordUser">Senha:</Label>
                <Input id="passwordUser" placeholder="senha" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmePasswordUser">Confirme a senha:</Label>
                <Input id="confirmePasswordUser" placeholder="senha" />
              </div>
            </div>
            <div className="flex items-center gap-3 ">
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
  )
}

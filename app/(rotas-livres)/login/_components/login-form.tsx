import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <form className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">SISPEUC - Consulta de processos</h1>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="login">Login</Label>
                <Input
                    id="email"
                    type="text"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
        </div>
    </form>    
  )
}

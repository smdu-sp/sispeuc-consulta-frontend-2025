import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";
import Imagem from "./_components/imagem";

export default function Login() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden py-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <LoginForm />
                            <Imagem />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
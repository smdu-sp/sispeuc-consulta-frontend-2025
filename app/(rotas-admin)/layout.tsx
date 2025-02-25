import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import Main from "@/components/main";

export default async function RotasAdmin({children}:{children: React.ReactNode}) {
  const session = await auth();
  if (!session) redirect('/login');
  if (['USR'].includes(session.usuario.permissao)) redirect('/');
  return <Main>{children}</Main>;
}
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import Main from "@/components/main";

export default async function RotasAuth({children}:{children: React.ReactNode}) {
    const session = await auth();
    if (!session) redirect('/login');
    return <Main>{children}</Main>;
}
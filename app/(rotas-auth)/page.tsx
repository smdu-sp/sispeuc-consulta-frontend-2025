import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth";

export default async function Home() {
  return (<>
    <div>Home</div>
    <form action={async () => {
      'use server'
      await signOut({ redirectTo: '/login' });
    }}>
      <Button type="submit">logout</Button>
    </form>
    <a href="/usuarios">Usuarios</a>
  </>);
}

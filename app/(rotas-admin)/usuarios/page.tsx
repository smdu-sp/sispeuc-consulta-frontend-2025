import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth";

export default async function Usuarios() {
  return (<>
    <div>Usuarios</div>
    <form action={async () => {
      'use server'
      await signOut({ redirectTo: '/login' });
    }}>
      <Button type="submit">logout</Button>
    </form>
    <a href="/">Home</a>
  </>);
}

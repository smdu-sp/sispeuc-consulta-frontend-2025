import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth";

export default async function Home() {
  return (<>
    <Main>
      <form action={async () => {
        'use server'
        await signOut({ redirectTo: '/login' });
      }}>
        <Button type="submit">logout</Button>
      </form>
    </Main>
  </>);
}

import Link from "next/link";
import { auth, signOut } from "./api/auth/[...nextauth]/route";
import IdleTimeoutHandler from "./IdleTimeoutHandler";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Home() {
  const session = await auth();
  return (
    <div>
      {session?.user ? (
        <div>
          <p>Welcome {session.user.name}!</p>
          <p>Job Title: {session.user.jobTitle}!</p>
          <div>
            <SignOut />
          </div>
          <IdleTimeoutHandler />
        </div>
      ) : (
        <Link href="api/auth/signin">
          <button>Sign in</button>
        </Link>
      )}
    </div>
  );
}

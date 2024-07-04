import { signOut } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function signout() {
    await signOut();
    redirect('/api/auth/signin');
}
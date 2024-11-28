import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

export default async function PrivateLayout({ children }) {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/home");
  }

  return <>{children}</>;
}

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/** Returns true if the current request is from an authenticated admin. */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
}

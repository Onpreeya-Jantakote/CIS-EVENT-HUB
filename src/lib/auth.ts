import { cookies } from "next/headers";
import { adminAuth } from "@/firebase/firebase-admin";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
  } catch (error) {
    return null;
  }
}
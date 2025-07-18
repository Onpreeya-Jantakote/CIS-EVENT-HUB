import { NextResponse } from "next/server";
import { adminAuth } from "@/firebase/firebase-admin";

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get("cookie") || "";
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await adminAuth.verifyIdToken(token);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

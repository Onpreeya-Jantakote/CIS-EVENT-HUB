import { NextResponse } from "next/server";
import { adminAuth } from "@/firebase/firebase-admin";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    await adminAuth.verifyIdToken(token);

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

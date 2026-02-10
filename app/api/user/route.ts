import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    const user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      avatar: decodedToken.picture,
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET environment variable is required");
const JWT_SECRET = new TextEncoder().encode(jwtSecret);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD environment variable is required");
const COOKIE_NAME = "amous_admin_token";

export async function verifyPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function createToken(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return await verifyToken(token);
}

export { COOKIE_NAME };

"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/validationSchema";
import z from "zod";
import { signIn } from "@/auth";

export async function login(values: z.infer<typeof LoginSchema>) {
  // 1️⃣ Validate fields
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  // 2️⃣ Check if user exists
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // 3️⃣ Check if user is blocked
  if (existingUser.status === "BANNED") {
    return { error: "You are banned and cannot log in" };
  }

  try {
    // 4️⃣ Try to sign in with credentials
    // Use redirect: false to handle response ourselves
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // If there's an error, return it
    if (result?.error) {
      return { error: "Invalid email or password!" };
    }

    // If result is undefined or has no error, login was successful
    // 5️⃣ Success login
    return { success: "Login successful!" };
  } catch (error: unknown) {
    console.error("LOGIN ERROR:", error);

    // Handle specific NextAuth errors
    if (error && typeof error === "object" && "type" in error) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password!" };
      }
    }

    return { error: "Something went wrong!" };
  }
}

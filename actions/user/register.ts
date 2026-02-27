"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validationSchema";
import bcrypt from "bcryptjs";
import z from "zod";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  // console.log("REGISTER EMAIL:", email);

  // const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  // console.log("EXISTING USER:", existingUser);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      status: "ACTIVE",
      role: "USER",
    },
  });

  await signIn("credentials", {
    email,
    password,
    // redirectTo: DEFAULT_LOGIN_REDIRECT,
    redirect: false,
  });

  return { success: "Confirmation Email sent!" };
}

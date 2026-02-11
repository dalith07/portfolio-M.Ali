// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
// import { LoginSchema } from "./src/lib/validationSchema";
// import { getUserByEmail } from "./src/data/user";

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error("Missing Google OAuth environment variables");
// }

// export default NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);
//         if (!validatedFields.success) return null;

//         const { email, password } = validatedFields.data;
//         const user = await getUserByEmail(email);
//         if (!user || !user.password) return null;

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) return null;

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],
// });

/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/lib/prisma";
import { ProfileSchema, ProfileSchemaType } from "@/lib/validationSchema";
import { z } from "zod";

export const createOrUpdateProfile = async (
  values: ProfileSchemaType,
  userId: string,
) => {
  const { image, ...profileData } = values;

  try {
    // update profile
    await prisma.profile.upsert({
      where: { userId },
      update: profileData,
      create: {
        userId,
        ...profileData,
      },
    });

    // 🔥 update user image
    if (image) {
      await prisma.user.update({
        where: { id: userId },
        data: { image },
      });
    }

    return { success: "Profile updated successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export async function updateUserProfile(
  values: z.infer<typeof ProfileSchema>,
  userId: string,
) {
  try {
    // 1️⃣ validation
    const validated = ProfileSchema.safeParse(values);
    if (!validated.success) {
      return { error: "Invalid data" };
    }

    const { phoneNumber, streetAddress, city, postalCode, image } =
      validated.data;

    // 2️⃣ update PROFILE (upsert)
    await prisma.profile.upsert({
      where: { userId },
      update: {
        phoneNumber,
        streetAddress,
        city,
        postalCode,
      },
      create: {
        userId,
        phoneNumber,
        streetAddress,
        city,
        postalCode,
      },
    });

    // 3️⃣ update USER image (global avatar)
    if (image) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          image,
        },
      });
    }

    return { success: "Profile updated successfully" };
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return { error: "Something went wrong" };
  }
}

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/prisma";

export async function createOrGetUser() {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    
    if (!kindeUser?.id) {
      throw new Error("Unauthorized");
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { kindeUserId: kindeUser.id }
    });

    if (existingUser) {
      return existingUser;
    }

    // Create new user if doesn't exist
    const name = kindeUser.given_name && kindeUser.family_name
      ? `${kindeUser.given_name} ${kindeUser.family_name}`
      : kindeUser.given_name || kindeUser.email;

    const newUser = await db.user.create({
      data: {
        kindeUserId: kindeUser.id,
        email: kindeUser.email,
        name: name,
        imageUrl: kindeUser.picture,
      }
    });

    return newUser;
  } catch (error) {
    console.error("Error in createOrGetUser:", error);
    throw new Error(error.message);
  }
} 
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getAnalytics(period = "30d") {
    const { userId } = await auth();
    if(!userId) throw new Error("unauthorized");

    const user = await db.user.findUnique({
        where:{ clerkUserId: userId},
    });

    if(!user) throw new Error("User not found");
}
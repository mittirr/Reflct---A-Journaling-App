"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { object } from "zod";

export async function getAnalytics(period = "30d") {
    const { userId } = await auth();
    if(!userId) throw new Error("unauthorized");

    const user = await db.user.findUnique({
        where:{ clerkUserId: userId},
    });

    if(!user) throw new Error("User not found");

    const startDate = new Date()
    switch (period) {
        case "7d":
            startDate.setDate(startDate.getDate() - 7);
            break;
        case "15d":
            startDate.setDate(startDate.getDate() - 15);
            break;
        case "30d":
        default:
            startDate.setDate(startDate.getDate() - 30);
            break;
    }

    const entries = await db.entry.findMany({
        where:{
            userId: user.id,
            createdAt:{
                gte: startDate,
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const moodData = entries.reduce((acc, entry) => {
        const date = entry.createdAt.toISOString().split("T")[0];
            if(!acc[date]){
                acc[date] = {
                    totalScore: 0,
                    count: 0,
                    entries: [],
                };
            }

            acc[date].totalScore += entry.moodScore;
            acc[date].date += 1;
            acc[date].entries.push(entry);
            return acc;
            
    },{});

    const analyticsData = Object.entries(moodData).map((date, data) => ({
        data,
        averageScore: Number(data.totalScore / data.count).toFixed(1),
        entryCount: data.count,
    }))
}
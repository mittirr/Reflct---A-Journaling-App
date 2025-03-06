"use server"

import { getMoodById, MOODS } from "@/app/lib/moods";
import { getPixabayImage } from "./public";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";
import { Code } from "lucide-react";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";


export async function createJournalEntry (data) {
    try {

        const {userId} = await auth();                       // chechking if user is logged in or not and acting accordingly
        if(!userId) throw new Error("Unauthorized");

        // ArcJet Rate Limiting

        const req = await request()

        const decision = await aj.protect(req,{
            userId,
            requested: 1,
        });

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const {remaining, reset} = decision.reason;
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details: {
                        remaining,
                        resetInSeconds: reset,
                    },
                });

                throw new Error("Too many requests, Please try again later.");

            }

            throw new Error("Request Blocked");
        }
        
        const user = await db.user.findUnique({                    // if user exists inside database
            where:{ clerkUserId: userId },
        })


        if (!user){                                          // if user is not found in database then throw error
            throw new Error("No User  Found");
        }

        const mood = MOODS[data.mood.toUpperCase()];         
        if(!mood) throw new Error("Invalid mood");

        const moodImageUrl = await getPixabayImage(data.moodQuery);         // sending api request to pixabay to get image according to mood

        const entry = await db.entry.create({                               // creating an entry to database
            data:{
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl,
                userId: user.id,
                collectionId: data.collectionId || null,
            },
        })

        await db.draft.deleteMany({                                         // deleting draft after it is saved to main collection
            where:{
                userId: user.id,
            }
        })

        revalidatePath('/dashboard');

        return entry;
     } catch (error) {
        throw new Error(error.message);
    }
}

export async function getJournalEntries({collectionId, orderBy = "desc",} = {}) {
    try {
        const {userId} = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });

        if(!user) throw new Error("User not found");
        

        const where = {
            userId: user.id,
            ...(collectionId === "unorganized"?
            {collectionId:null} : collectionId?
            {collectionId} : {}),
        };
        
        const entries = await db.entry.findMany({
            where,
            include:{
                collection: {
                    select:{
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: orderBy,
            },

        });

        const entriesWithMoodData = entries.map((entry) => ({
            ...entry,
            moodData: getMoodById(entry.mood),
        }));

        return{
            success: true,
            data: {
                entries: entriesWithMoodData,
            },
        };
    } catch (error) {
        return {success: false, error: error.message};
    }
}

export async function getJournalEntry(id) {
    try {
        const {userId} = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });

        if(!user) throw new Error("User not found");

        const entry = await db.entry.findFirst({
            where: {
                id,
                userId: user.id,
            },
            include:{
                collection:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            }
        });

        if(!entry) throw new Error("Entry not found");

        return entry;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteJournalEntry(id) {
    try {
        const {userId} = await auth();                       // chechking if user is logged in or not and acting accordingly
    if(!userId) throw new Error("Unauthorized");


    const user = await db.user.findUnique({                    // if user exists inside database
        where:{ clerkUserId: userId },
    })

    if (!user){                                          // if user is not found in database then throw error
        throw new Error("No User  Found");
    } 

    const entry = await db.entry.findFirst({
        where:{
            userId: user.id,
            id,
        },
    });

    if(!entry) throw new Error("Collection not found");

    await db.entry.delete({
        where: { id },
    });

    revalidatePath("/dashboard");

    return entry;

    } catch (error) {
        throw new Error(error.message);
    }
    
    
};
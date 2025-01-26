"use server"

import { MOODS } from "@/app/lib/moods";
import { getPixabayImage } from "./public";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";


export async function createJournalEntry (data) {
    try {

        const {userId} = await auth();                       // chechking if user is logged in or not and acting accordingly
        if(!userId) throw new Error("Unauthorized");

        // ArcJet Rate Limiting
        
        const user = db.user.findUnique({                    // if user is there then finding their data in database
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
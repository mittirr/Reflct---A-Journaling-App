"use server"

import { getMoodById, MOODS } from "@/app/lib/moods";
import { getPixabayImage } from "./public";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "../lib/prisma";
import { Code } from "lucide-react";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { createOrGetUser } from "./user";

export async function createJournalEntry(data) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const entry = await db.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: data.mood,
                moodScore: data.moodScore,
                moodImageUrl: data.moodImageUrl,
                collectionId: data.collectionId || null,
                userId: user.id,
            },
        });

        // Revalidate all relevant paths after creating an entry
        revalidatePath("/dashboard");
        revalidatePath("/collection/[collectionId]");
        revalidatePath("/journal/[id]");
        
        return entry;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getJournalEntries({ collectionId } = {}) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const entries = await db.entry.findMany({
            where: {
                userId: user.id,
                ...(collectionId === "unorganized" 
                    ? { collectionId: null }
                    : collectionId 
                    ? { collectionId } 
                    : {}),
            },
            include: {
                collection: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Add mood data to each entry
        const entriesWithMoodData = entries.map(entry => ({
            ...entry,
            moodData: MOODS[entry.mood?.toUpperCase()] || MOODS.NEUTRAL
        }));

        return entriesWithMoodData;
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        return [];
    }
}

export async function getJournalEntry(entryId) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const entry = await db.entry.findUnique({
            where: {
                id: entryId,
                userId: user.id,
            },
            include: {
                collection: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return entry;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateJournalEntry(entryId, data) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        if (!entryId) throw new Error("Entry ID is required");
        if (!data) throw new Error("Update data is required");

        const entry = await db.entry.update({
            where: {
                id: entryId,
                userId: user.id,
            },
            data: {
                title: data.title,
                content: data.content,
                mood: data.mood,
                moodScore: data.moodScore,
                moodImageUrl: data.moodImageUrl,
                collectionId: data.collectionId || null,
            },
        });

        revalidatePath("/dashboard");
        return entry;
    } catch (error) {
        console.error("Error updating journal entry:", error);
        throw new Error(error.message);
    }
}

export async function deleteJournalEntry(entryId) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        await db.entry.delete({
            where: {
                id: entryId,
                userId: user.id,
            },
        });

        revalidatePath("/dashboard");
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getDraft() {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const draft = await db.draft.findUnique({
            where: {
                userId: user.id,
            },
        });

        return { success: true, data: draft };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function saveDraft(data) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const draft = await db.draft.upsert({
            where: {
                userId: user.id,
            },
            create: {
                title: data.title,
                content: data.content,
                mood: data.mood,
                userId: user.id,
            },
            update: {
                title: data.title,
                content: data.content,
                mood: data.mood,
            },
        });

        revalidatePath("/dashboard");
        return { success: true, data: draft };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
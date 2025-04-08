"use server"

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createOrGetUser } from "./user";

export async function createDraft(data) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const draft = await db.draft.create({
            data: {
                title: data.title,
                content: data.content,
                mood: data.mood,
                userId: user.id,
            },
        });

        revalidatePath("/dashboard");
        return draft;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getDraft() {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const draft = await db.draft.findFirst({
            where: {
                userId: user.id,
            },
        });

        return draft;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateDraft(data) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const draft = await db.draft.update({
            where: {
                userId: user.id,
            },
            data: {
                title: data.title,
                content: data.content,
                mood: data.mood,
            },
        });

        revalidatePath("/dashboard");
        return draft;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteDraft() {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        await db.draft.deleteMany({
            where: {
                userId: user.id,
            },
        });

        revalidatePath("/dashboard");
    } catch (error) {
        throw new Error(error.message);
    }
} 
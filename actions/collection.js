"use server"

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { createOrGetUser } from "./user";

export async function createCollection(data) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        // ArcJet Rate Limiting
        const req = await request()

        const decision = await aj.protect(req,{
            userId: user.kindeUserId,
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

        const collection = await db.collection.create({
            data:{
                name: data.name,
                description: data.description,
                userId: user.id,
            },
        });

        revalidatePath("/dashboard");
        return collection;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getCollections() {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const collections = await db.collection.findMany({
            where:{
                userId: user.id,
            },
            orderBy:{ createdAt: "desc" },
        });

        return collections;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getCollection(collectionId) {
    try {
        const user = await createOrGetUser();
        if (!user) throw new Error("Unauthorized");

        const collection = await db.collection.findUnique({
            where:{
                userId: user.id,
                id: collectionId,
            },
        });

        return collection;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteCollection(collectionId) {
    try {
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();
        if (!kindeUser?.id) throw new Error("Unauthorized");

        const user = await db.user.findUnique({                    // if user exists inside database
            where:{ kindeUserId: kindeUser.id },
        })

        if (!user){                                          // if user is not found in database then throw error
            throw new Error("No User Found");
        } 

    const collection = await db.collection.findFirst({
        where:{
            userId: user.id,
            id: collectionId,
        },
    });

    if(!collection) throw new Error("Collection not found");

    await db.collection.delete({
        where: {
            id: collectionId,
        },
    });

    return true;

    } catch (error) {
        throw new Error(error.message);
    }
    
    
};
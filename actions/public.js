"use server"

import { unstable_cache } from "next/cache";

export async function getPixabayImage(query) {
    try {
        const res = await fetch(`https://pixabay.com/api?q=${query}&key=${process.env.PIXABAY_API_KEY}&image_type=illustration&category=feelings`);

        const data = await res.json();
        return data.hits[0].fullHDURL || null;


    } catch (error) {
        console.log(error)
    }
}

export const getDailyPrompt = unstable_cache( async () => {
    try {
        const res = await fetch("https://api.adviceslip.com/advice",{
            cache:"no-store"
        }) 
        
        const data = await res.json();
        return data.slip.advice;
    } catch (error) {
        return{
            success: false,
            data: "What's on your mind today?",
        };
    }
},["daily-prompts"],{
    revalidate: 86400,
    tags: ["daily-prompts"],
}

)
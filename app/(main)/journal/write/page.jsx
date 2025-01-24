"use client"

import dynamic from 'next/dynamic';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import { BarLoader } from 'react-spinners';
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from '@/app/lib/schema';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOODS } from '@/app/lib/moods';
import { object } from 'zod';

const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false});
const JournalEntryPage = () => {

  const {register, handleSubmit, control, formState:{errors}} = useForm({
    resolver: zodResolver(journalSchema), 
    defaultValues:{
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  const isLoading = false;

  return (

    <div className="py-8">
      <form className="space-y-2 mx-auto">
        <h1 className="text-5xl md:text-6xl gradient-title">
          what&apos;s on your mind?
        </h1>

        {isLoading && <BarLoader color="orange" width={"100%"}/>}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input 
            {...register("title")}
            placeholder="Enter a Title..."
            className={`py-5 md:text-md ${errors.title?"border-red-500" : ""}`}
          />
          {errors.title && (<p className="text-red-500 text-sm">{errors.title.message}</p>)}
          
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">How are you feeling?</label>
          <Controller
            name="mood"
            control={control}
            render={({field}) => {
              return(
                <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={errors.mood? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your mood..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MOODS).map((mood) => {
                    return (
                      <SelectItem key={mood.id} value={mood.label}>
                        <span className="flex items-center gap-2">
                          {mood.emoji} {mood.label}
                        </span>
                      </SelectItem>
                    );
                })}
                    </SelectContent>
                </Select>
              )
            }}
          />

          {errors.mood && (<p className="text-red-500 text-sm">{errors.mood.message}</p>)}
          
          
        </div>
      </form>
    </div>
  )
}

export default JournalEntryPage
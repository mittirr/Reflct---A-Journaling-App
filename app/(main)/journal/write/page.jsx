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
import { getMoodById, MOODS } from '@/app/lib/moods';
import { object } from 'zod';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { createJournalEntry } from '@/actions/journal';

const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false});
const JournalEntryPage = () => {

  useFetch()

  const {register, handleSubmit, control, formState:{errors}, getValues} = useForm({
    resolver: zodResolver(journalSchema), 
    defaultValues:{
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  const isLoading = false;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  });

  return (

    <div className="py-8">
      <form className="space-y-2 mx-auto" onSubmit={onSubmit}>
        <h1 className="text-5xl md:text-6xl gradient-title">
          what&apos;s on your mind?
        </h1>

        {isLoading && <BarLoader color="orange" width={"100%"}/>}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input 
            disables={isLoading}
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

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getMoodById(getValues("mood"))?.prompt ?? "write your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({field}) => <ReactQuill 
            readOnly={isLoading} 
            theme="snow" 
            value={field.value} 
            onChange={field.onChange}
            modules={{
              toolbar:[
                [{header: [1,2,3,false]}],
                ["bold", "italic", "underline", "strike"],
                [{list: "ordered"}, {list: "bullet"}],
                ["blockquote", "code-block"],
                ["link"],
                ["clean"],
              ],
            }}
            />}
          />

          {errors.content && (<p className="text-red-500 text-sm">{errors.content.message}</p>)}
          
          
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Add to Collection (optional)
          </label>
          {/* <Controller
            name="content"
            control={control}
            render={({field}) => {}}
          /> */}

          {errors.collectionId && (<p className="text-red-500 text-sm">{errors.collectionId.message}</p>)}
          
          
        </div>

        <div className="space-y-4 flex">
          <Button type="submit" variant="journal">Publish</Button>
        </div>
      </form>
    </div>
  )
}

export default JournalEntryPage
"use client";

import dynamic from 'next/dynamic';
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
import {useEffect, useState} from "react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCollection, getCollections } from '@/actions/collection';
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import CollectionForm from '@/components/collection-dialog';


const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false});
export default function JournalEntryPage(){

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  // Fetch Hooks

  const {
    loading: collectionsLoading,
    fn: fetchCollections, 
    data: collections,
  } = useFetch(getCollections);
  
  const {
    loading: actionLoading,
    fn: actionFn, 
    data: actionResult,
  } = useFetch(createJournalEntry);


  const {
    loading: createCollectionLoading,
    fn: createCollectionFn, 
    data: createdCollection,
  } = useFetch(createCollection);

  

  const {register, handleSubmit, control, setValue, watch, reset, formState:{errors}, getValues} = useForm({
    resolver: zodResolver(journalSchema), 
    defaultValues:{
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  useEffect(() => {
    fetchCollections();
  }, [])
  

  useEffect(() => {
    if(actionResult && !actionLoading){
      router.push(
        `/collections/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
    );

      toast.success("Entry Created Successfully");
    }
  }, [actionResult, actionLoading]);                  // run this use effect whenever actionResult or actionLoading changes
  
  

  const onSubmit = handleSubmit(async (data) => {
    const mood = getMoodById(data.mood);

    actionFn({
      ...data,
      moodScore: mood.score,
      moodQuery: mood.pixabayQuery,
    });
  });

  useEffect(() => {
    if(createdCollection){
      setIsCollectionDialogOpen(false);
      fetchCollections();
      setValue("collectionId", createdCollection.id);
      toast.success(`Collection ${createdCollection.name} created!`);
    }
  }, [createdCollection])
  
  const handleCreateCollection = async (data) =>{
    createCollectionFn(data);
  }

  const isLoading = actionLoading || collectionsLoading;

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
          <Controller
            name="collectionId"
            control={control}
            render={({field}) => {
              return(
                <Select 
                  onValueChange={(value)=>{
                    if (value === "new"){
                      setIsCollectionDialogOpen(true)
                    } else{
                      field.onChange(value);
                    } 
                  }} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Collection..." />
                </SelectTrigger>
                <SelectContent>
                {collections?.map((collection) => {
                    return (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </SelectItem>
                    );
                })}
                      <SelectItem value="new">
                          <span className="text-yellow-600">
                            + Create New Collection
                          </span>
                      </SelectItem>
                </SelectContent>
                </Select>
              )
            }}
          />

          {errors.collectionId && (<p className="text-red-500 text-sm">{errors.collectionId.message}</p>)}
          
          
        </div>

        <div className="space-y-4 flex">
          <Button type="submit" variant="journal" disabled={actionLoading}>Publish</Button>
        </div>
      </form>

      <CollectionForm 
      loading = {createCollection}
      onSucsess= {handleCreateCollection}
      open={isCollectionDialogOpen}
      setOpen={setIsCollectionDialogOpen}/>
    </div>
  )
}
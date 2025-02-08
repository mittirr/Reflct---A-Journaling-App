"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BarLoader } from 'react-spinners'
import { collectionSchema } from '@/app/lib/schema'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


const CollectionForm = ({onSuccess, open, setOpen, loading}) => {


    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: zodResolver(collectionSchema),
        defaultValues:{
            name: "",
            description: "",
        },
    });


    const onSubmit = handleSubmit(async (data) => {
        onSuccess(data);
    });
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            
            {loading && (
                <BarLoader className="mb-4" color="orange" width={"100%"}/>
                )}

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Collection Name</label>
                    <Input 
                        {...register("name")}
                        placeholder="Enter collection name..."
                        className={`${errors.name?"border-red-500" : ""}`}
                    />
                    {errors.name && 
                    (<p className="text-red-500 text-sm">{errors.name.message}</p>)}
          
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Collection Name</label>
                    <Textarea 
                        {...register("description")}
                        placeholder="Describe your collection..."
                        className={`${errors.description?"border-red-500" : ""}`}
                    />
                    {errors.description && (<p className="text-red-500 text-sm">{errors.description.message}</p>)}
            
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" variant="journal">Create Collection</Button>
                </div>
            </form>
    </DialogContent>
    </Dialog>

  )
}

export default CollectionForm;
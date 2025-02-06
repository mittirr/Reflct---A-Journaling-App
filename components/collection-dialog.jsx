"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BarLoader } from 'react-spinners'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { CollectionSchema } from '@/app/lib/schema'

const CollectionForm = ({onSuccess, open, setOpen, loading}) => {


    const {register, handlesubmit, formState: {errors},} = useForm({
        resolver: zodResolver(CollectionSchema),
        defaultValues:{
            name: "",
            description: "",
        },
    });


    const onSubmit = handlesubmit(async(data)=>{
        onSuccess(data);
    });
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Create New Collection</DialogTitle>
        {loading && <BarLoader color="orange" width={"100%"}/>}
            <form onsubmit={onsubmit} className="space-y-2">
            <div className="space-y-2">
            <label className="text-sm font-medium">Collection Name</label>
            <Input 
                disables={loading}
                {...register("name")}
                placeholder="Enter collection name..."
                className={`${errors.title?"border-red-500" : ""}`}
            />
            {errors.name && (<p className="text-red-500 text-sm">{errors.name.message}</p>)}
          
            </div>

            <div className="space-y-2">
            <label className="text-sm font-medium">Collection Name</label>
            <Textarea 
                disables={loading}
                {...register("description")}
                placeholder="Describe your collection..."
                className={`${errors.title?"border-red-500" : ""}`}
            />
            {errors.description && (<p className="text-red-500 text-sm">{errors.description.message}</p>)}
          
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="journal">Create Collection</Button>
            </div>
            </form>
        </DialogHeader>
    </DialogContent>
    </Dialog>

  )
}

export default CollectionForm;
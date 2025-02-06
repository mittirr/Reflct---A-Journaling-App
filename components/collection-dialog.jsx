"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const CollectionForm = ({onSuccess, open, setOpen, loading}) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Create New Collection</DialogTitle>
        
        </DialogHeader>
    </DialogContent>
    </Dialog>

  )
}

export default CollectionForm
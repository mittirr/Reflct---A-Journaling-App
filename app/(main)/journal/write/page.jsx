"use client"

import dynamic from 'next/dynamic';
import React from 'react'
import { useForm } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import { BarLoader } from 'react-spinners';
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from '@/app/lib/schema';

const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false});
const JournalEntryPage = () => {

  const {register, handleSubmit, control } = useForm({
    resolver: zodResolver(journalSchema), 
    defaultValues:{
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  return (

    <div className="py-8">
      <form>
        <h1 className="text-5xl md:text-6xl gradient-title">
          what&apos;s on your mind?
        </h1>

        <BarLoader/>
      </form>
    </div>
  )
}

export default JournalEntryPage
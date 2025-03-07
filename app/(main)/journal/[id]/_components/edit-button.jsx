"use client"

import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

const EditButton = ({ entryId }) => {

  const router = useRouter();
  
  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={() => Router.push(`/journal/write?edit=${entryId}`)}
    >
      <Edit className="h-4 w-4 mr-2"/>
    </Button>
  )
}

export default EditButton
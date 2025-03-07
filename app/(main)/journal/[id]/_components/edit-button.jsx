"use client"

import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

const EditButton = ({ entryId }) => {

  const router = useRouter();

  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={() => router.push(`/journal/write?edit=${entryId}`)}
    >
      <Edit className="h-4 w-4 mr-2"/>
      Edit
    </Button>
  )
}

export default EditButton
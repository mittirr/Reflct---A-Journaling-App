import { getJournalEntries } from '@/actions/journal';
import React from 'react'

const CollectionPage = async({params}) => {
    const {collectionId} = params;
    const entries = await getJournalEntries({ collectionId });
  return (
    <div>CollectionPage</div>
  )
}

export default CollectionPage
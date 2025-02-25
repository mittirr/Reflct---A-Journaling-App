import { getCollection } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'

const CollectionPage = async({params}) => {
    const {collectionId} = params;
    const entries = await getJournalEntries({ collectionId });
    const collection = await getCollection(collectionId)
  return (
    <div>CollectionPage</div>
  )
}

export default CollectionPage
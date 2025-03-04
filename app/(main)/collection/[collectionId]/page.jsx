import { getCollection } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'

const CollectionPage = async({params}) => {
    const { collectionId } = await params;
    const entries = await getJournalEntries({ collectionId });
    const collection = await getCollection(collectionId)
  return (
    <div>
      <div>
        <div>
          <h1>
            {collectionId === "unorganized"
              ? "Unorganized Entries"
              : collection?.name || "collection"}
          </h1>
          {collection && <DeleteCollectionDialog />}
        </div>
      </div>
    </div>
  )
}

export default CollectionPage
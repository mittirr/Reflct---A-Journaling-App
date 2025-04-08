"use server"

import { getCollection } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'
import DeleteCollectionDialog from '../_components/delete-collection';
import JournalFilters from '../_components/journal-filters';

const CollectionPage = async({params}) => {
    const { collectionId } = await params;
    const entries = await getJournalEntries({ collectionId });
    const collection = await getCollection(collectionId);

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold gradient-title">
                        {collectionId === "unorganized"
                            ? "Unorganized Entries"
                            : collection?.name || "Collection"}
                    </h1>
                    {collection && (
                        <DeleteCollectionDialog 
                            collection={collection}
                            entriesCount={entries?.length || 0}
                        />
                    )}
                </div>
                {collection?.description && (
                    <h2 className="font-extralight pl-1">{collection?.description}</h2>
                )}
            </div>
            {/* render entries */}
            <JournalFilters entries={entries || []}/>
        </div>
    );
}

export default CollectionPage;
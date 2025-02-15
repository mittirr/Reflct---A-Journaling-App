"use client"

import { useState, useEffect } from "react";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-dialog";
import { toast } from "sonner";
import { createCollection } from "@/actions/collection";
import useFetch from "@/hooks/use-fetch";

const Collections = ({collections = [], entriesByCollections}) => {
    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)

    const {
        loading: createCollectionLoading,
        fn: createCollectionFn, 
        data: createdCollection,
    } = useFetch(createCollection);

    useEffect(() => {
        if(createdCollection){
          setIsCollectionDialogOpen(false);
          toast.success(`Collection ${createdCollection.name} created!`);
        }
    }, [createdCollection])

    const handleCreateCollection = () => {};

    if(collections.length === 0) return <></>;
return <section>
    <h2>Collections</h2>
    <div>
        <CollectionPreview
            isCreateNew={true}
            onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {entriesByCollections?.unorganized?.length > 0 && (
            <CollectionPreview
                name="unorganized"
                entries={entriesByCollections.unorganized}
                isUnorganized={true}
            />
        )}

        {collections?.map((collection) => {
            <CollectionPreview
                key={collection.id}
                id={collection.id}
                name={collection.name}
                entries={entriesByCollections[collection.id] || []}
            />
        })}

        <CollectionForm
            loading = {createCollectionLoading}
            onSuccess= {handleCreateCollection}
            open={isCollectionDialogOpen}
            setOpen={setIsCollectionDialogOpen}
        />
    </div>
  </section>
};

export default Collections
"use client"

import { useState, useEffect } from "react";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-dialog";
import { toast } from "sonner";
import { createCollection } from "@/actions/collection";
import useFetch from "@/hooks/use-fetch";

const Collections = ({collections = [], entriesByCollection}) => {
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

    const handleCreateCollection = async (data) => {
        createCollectionFn(data);
    };

    if(collections.length === 0) return <></>;

return <section id="collections" className="space-y-6"> 
    <h2 className="text-3xl font-bold gradient-title">Collections</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" > 
        <CollectionPreview
            isCreateNew={true}
            onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {entriesByCollection?.unorganized?.length > 0 && (
            <CollectionPreview
                name="unorganized"
                entries={entriesByCollection.unorganized}
                isUnorganized={true}
            />
        )}

        {collections?.map((collection) => (
            <CollectionPreview
                key={collection.id}
                id={collection.id}
                name={collection.name}
                entries={entriesByCollection[collection.id] || []}
            />
        ))}

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
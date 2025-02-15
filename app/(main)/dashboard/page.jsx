import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'
import Collections from './_components/collections';

const Dashboard = async () => {

  const collections = await getCollections();
  const entriesData = await getJournalEntries();
  
  const entriesByCollection =entriesData?.data.entries.reduce(
    (acc,entry) => {
      const collectionId = entry.collectionId || "unorganized";

      if (!acc[collectionId]){
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },{});

    console.log(entriesByCollection)
  return <div className="px-4 py-8 space-y-8">
      <section className="space-y-4">{/*Mood Analytics*/}</section>
      
      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />
    </div>
};

export default Dashboard
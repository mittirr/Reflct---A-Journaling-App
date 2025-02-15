import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'

const Dashboard = async () => {

  const collections = await getCollections();
  const entriesData = await getJournalEntries();

  console.log(collections,entriesData);
  
  // const entriesByCollection =entriesData?.data.entries.reduce(
  //   (acc,entry) => {
  //     const collectionId = entry.collectionId || "unorganized";

  //     if (!acc[collectionId]){
  //       acc[collectionId] = [];
  //     }
  //     acc[collectionId].push(entry);
  //     return acc;
  //   },{});

  //   console.log(entriesByCollection)
  return (
    <div>Dashboard</div>
  )
};

export default Dashboard
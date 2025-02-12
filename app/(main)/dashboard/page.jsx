import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'

const Dashboard = async () => {

  const collections = await getCollections();
  const entriesData = await getJournalEntries();

  const entriesByCollection =entriesData?.data.entries.reduce(
    (acc,entry) => {
      const collectionId = entry.collectionId || "unorganized";
    },{})
  return (
    <div>Dashboard</div>
  )
};

export default Dashboard
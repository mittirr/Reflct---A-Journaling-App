import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react'

const Dashboard = async () => {

  const collections = await getCollections();
  const entriesData = await getJournalEntries();
  return (
    <div>Dashboard</div>
  )
};

export default Dashboard
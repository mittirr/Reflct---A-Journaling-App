import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import Collections from './_components/collections';
import MoodAnalytics from './_components/mood-analytics';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import { Suspense } from 'react';

// Mark the page as dynamic to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Dashboard = async () => {
  const collections = await getCollections();
  const entries = await getJournalEntries();
  
  // Group entries by collection
  const entriesByCollection = (entries || []).reduce(
    (acc, entry) => {
      const collectionId = entry.collectionId || "unorganized";

      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );
    
  return (
    <div className="px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold gradient-title">Dashboard</h1>
        <Link href="/journal/write">
          <Button variant="journal" className="flex items-center gap-2">
            <PenLine className="w-4 h-4" />
            Write Journal
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div>Loading analytics...</div>}>
        <section className="space-y-4">
          <MoodAnalytics />
        </section>
      </Suspense>
      
      <Suspense fallback={<div>Loading collections...</div>}>
        <Collections
          collections={collections}
          entriesByCollection={entriesByCollection}
        />
      </Suspense>
    </div>
  );
};

export default Dashboard;
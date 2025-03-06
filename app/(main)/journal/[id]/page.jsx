import { getJournalEntry } from '@/actions/journal';
import { getMoodById } from '@/app/lib/moods';
import Image from 'next/image';

export default async function JournalEntryPage({params}){
    const { id } = await params;
    const entry = await getJournalEntry(id);
    const mood = getMoodById(entry.mood);
    
  return (
    <>
      {entry.moodImageUrl && (
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={entry.moodImageUrl}
            alt="Mood visualization"
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
    </>
  )
}

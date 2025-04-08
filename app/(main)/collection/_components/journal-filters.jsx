"use client"

import { CalendarIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from "react";
import { SelectItem } from '@radix-ui/react-select';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOODS } from '@/app/lib/moods';
import { Button } from '@/components/ui/button';
import { format, isSameDay } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import EntryCard from '@/components/entry-card';
import { useRouter } from 'next/navigation';

const JournalFilters = ({entries}) => {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [date, setDate] = useState(null);
    const [filteredEntries, setFilteredEntries] = useState(entries);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let filtered = entries;

        if(searchQuery){
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (entry) => 
                    entry.title.toLowerCase().includes(query) ||
                    entry.content.toLowerCase().includes(query)
            );
        }

        if(selectedMood){
            filtered = filtered.filter((entry) => entry.mood === selectedMood);
        }

        if(date){
            filtered = filtered.filter((entry) => 
                isSameDay(new Date(entry.createdAt), date)
            );
        }
        
        setFilteredEntries(filtered);
    }, [entries, searchQuery, selectedMood, date]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedMood("");
        setDate(null);
    };

    if (!mounted) {
        return null;
    }

    return ( 
        <>
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <Input
                        placeholder="Search entries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                        prefix={<Search className="h-4 w-4 text-gray-400"/>}
                    />
                </div>
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by mood" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(MOODS).map((mood) => (
                            <SelectItem key={mood.id} value={mood.id}>
                                <span className="flex items-center gap-2">
                                    {mood.emoji} {mood.label}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="h-4 w-4"/>
                            {date ? format(date, "PPP") : <span>Pick a Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {(searchQuery || selectedMood || date) && (
                    <Button variant="ghost" className="text-yellow-600" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                )}
            </div>
            <div className="text-sm text-gray-500">
                Showing {filteredEntries.length} of {entries.length} entries
            </div>

            {filteredEntries.length === 0 ? (
                <div className="text-center p-8">
                    <p className="text-gray-500">No entries found</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredEntries.map((entry) => (
                        <EntryCard key={entry.id} entry={entry}/>
                    ))}
                </div>
            )}
        </>
    );
}

export default JournalFilters;
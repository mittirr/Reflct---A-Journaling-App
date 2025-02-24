"use client";

import { getAnalytics } from '@/actions/analytics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import MoodAnalyticsSkeleton from './analytics-loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


const timeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "15d", label: "Last 15 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];


const MoodAnalytics = () => {
  const [period, setPeriod] = useState("7d")

  const {
    loading,
    data: analytics,
    fn: fetchAnalytics,
  } = useFetch(getAnalytics);

  console.log(analytics);
  
  const {isLoaded} = useUser();

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  if (loading || !analytics?.data || !isLoaded){
    return <MoodAnalyticsSkeleton/>;
  }

  const {timeline, stats} = analytics.data;
  return <>
  <div className="flex justify-between items-center">
    <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>
    <Select value={period} onValueChange={setPeriod}>
    <SelectTrigger className="w-[140px]">
        <SelectValue/>
    </SelectTrigger>
    <SelectContent>
        {timeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
                {option.label}
            </SelectItem>
        ))}
    </SelectContent>
    </Select>
  </div>

  <div className="space-y-6">
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{stats.totalEntries}</p>
        <p className="text-xs text-muted-foreground">~{stats.dailyAverage} entries per day</p>
      </CardContent>
    </Card>
    </div>
  </div>
  </>
}

export default MoodAnalytics;
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'
import { useState } from 'react';


const timeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "15d", label: "Last 15 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];


const MoodAnalytics = () => {
  const [period, setPeriod] = useState("7d")
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
  </>
}

export default MoodAnalytics;
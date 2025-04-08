"use client";

import { useEffect, useState } from "react";
// Removing the server-side import
// import { getKindeUser } from "@/lib/kinde";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { BarChart, Book, Calendar, ChevronRight, FileText, Lock, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import faqs from "@/data/faqs"
import { getDailyPrompt } from "@/actions/public";
import { useKindeClient } from "@/lib/kinde-client";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default function Home() {
  const [advice, setAdvice] = useState("Loading advice...");
  const { user, isLoading } = useKindeClient();

  useEffect(() => {
    async function fetchAdvice() {
      const dailyAdvice = await getDailyPrompt();
      setAdvice(dailyAdvice);
    }
    fetchAdvice();
  }, []);

  return (
    <div className="container mx-auto py-16 relative px-4">
      <div className='text-center mx-auto max-w-5xl space-y-8'>
        <h1 className='text-5xl md:text-7xl lg:text-8xl mb-6 gradient-title'>Your Space to Reflect. <br />
            Your Story to Tell.
        </h1>
        <p className='text-lg md:text-xl mb-8 text-yellow-600'>
          Capture your thougths, Track your mood and reflect on your journey in a beautiful, secure space.
        </p>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-t from-yellow-50 via-transparent to-transparent pointer-events-none z-10'/>
          <div className='bg-white rounded-2xl p-4 max-h-full mx-auto'>
            
            <div className='border-b border-yellow-100 pb-4 mb-4 flex items-center justify-between'>
              
              <div className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-yellow-400'/>
                <span className='text-yellow-900 font-medium'>
                  Today&rsquo;s Entry
                </span>
              </div>
              
              <div className='flex gap-2'>
                <div className='h-3 w-3 rounded-full bg-yellow-200' />
                <div className='h-3 w-3 rounded-full bg-yellow-300' />
                <div className='h-3 w-3 rounded-full bg-yellow-400' />
              </div>

              
            </div>

            <div className='space-y-4 p-4'>
              <h3 className='text-xl font-semibold text-yellow-900'>
                {advice}
              </h3>
              <Skeleton className='h-4 bg-yellow-100 w-3/4'/>
              <Skeleton className='h-4 bg-yellow-100 w-full'/>
              <Skeleton className='h-4 bg-yellow-100 w-2/3'/>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-4'>
          
          <Link href='/dashboard'>
          <Button variant='journal' className='px-8 py-6 text-black rounded-full flex items-center gap-2 neobrutalism-3'>
            Start Writting <ChevronRight className="h-5 w-5" />
          </Button>
          </Link>

          <Link href='#features'>
          <Button variant='outline' className='px-8 py-6 rounded-full border-yellow-600 text-yellow-600 hover:bg-yellow-100 neobrutalism-3'>
            Learn More 
          </Button>
          </Link>

        </div>
      </div>

      <section id='features' className='mt-24 grid md:grid-flow-col gap-8'>
        {features.map((feature, index) => (
          <Card key={feature.title} className='drop-shadow-md shadow-xl'>
            <CardContent className='p-6'>
              <div className='h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4'>
                <feature.icon className='h-6 w-6 text-yellow-600'/>
              </div>
              <h3 className='font-semibold text-xl text-yellow-900 mb-2'>
                {feature.title}
              </h3>
              <p className='text-yellow-700'>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>


                            {/* features */}
      <div className="space-y-24 mt-24">
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 ">
            <div className='h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4'>
              <FileText className= 'h-6 w-6 text-yellow-600'/>
            </div>
            <h3 className="text-2xl font-bold text-yellow-900">Rich Text Editor</h3>
            <p className="text-lg text-yellow-700">
              Express yourself fully with our powerfull editor featuring:
            </p>
            <ul className="space-y-3">
              <li className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-yellow-400'/>
                <span>Format text with ease</span>
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-yellow-400'/>
                <span>Embed links</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-orange-100 neobrutalism-4">
            <div className="flex gap-2 mb-6">
              <div className="h-8 w-8 rounded bg-yellow-100 border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
              <div className="h-8 w-8 rounded bg-yellow-100 border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
              <div className="h-8 w-8 rounded bg-yellow-100 border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
            </div>
            <div className="h-4 bg-yellow-50 rounded w-3/4 border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
            <div className="h-4 bg-yellow-50 rounded w-full border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
            <div className="h-4 bg-yellow-50 rounded w-2/3 border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
            <div className="h-4 bg-yellow-50 rounded w-1/3 border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-orange-100 neobrutalism-4">
            <div className="h-40 bg-gradient-to-t from-yellow-100 to-yellow-50 rounded-lg border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-yellow-100 rounded border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
              <div className="h-4 w-16 bg-yellow-100 rounded border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
              <div className="h-4 w-16 bg-yellow-100 rounded border-black border-2 shadow-[px_px_0px_0px_rgba(0,0,0,1)]"/>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className='h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4'>
              <BarChart className= 'h-6 w-6 text-yellow-600'/>
            </div>
            <h3 className="text-2xl font-bold text-yellow-900">Mood Analytics</h3>
            <p className="text-lg text-yellow-700">
              Track your emotional journey with powerful analytics:
            </p>
            <ul className="space-y-3">
              <li className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-yellow-400'/>
                <span>Visual mood trends</span>
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-yellow-400'/>
                <span>Pattern recognition</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
                    {/* TESTIMONIALS */}

      <TestimonialCarousel/>

                    {/* FAQS */}

      <div className='mt-24'> 
        <h2 className='text-3xl font-bold text-center text-yellow-900 mb-12'>FAQs</h2>
        <Accordion type="single" collapsible className='w-full mx-auto'>
          {faqs.map((faq, index) =>{
            return(
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger className='text-yellow-900 text-lg'>{faq.q}</AccordionTrigger>
                <AccordionContent className='text-yellow-700'>{faq.a}</AccordionContent>
              </AccordionItem>
            )
          })}
          
        </Accordion>
      </div>

      <div className="mt-24">
        <Card className="bg-gradient-to-r  from-amber-100 to-yellow-100">
          <CardContent className='p-12 text-center'>
            <h2 className="text-3xl font-bold text-yellow-900 mb-6">Start Reflecting on Your Journey Today</h2>
            <p className="text-lg mb-8 max-2xl mx-auto text-yellow-700">Join thousands of writers who have already discovered the power of digital journaling.</p>
            <Link href="/dashboard">
              <Button size="lg" variant="journal" className="animate-bounce">
                Get Started for Free <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

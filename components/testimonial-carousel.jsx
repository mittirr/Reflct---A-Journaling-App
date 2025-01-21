"use client"

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import testimonials from "@/data/testimonials"
import { Card, CardContent } from './ui/card'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TestimonialCarousel = () => {
  return (
    <div className='mt-24'>
        <h2 className='text-3xl text-center font-bold text-yellow-900 mb-12'>What Our Writers Say</h2>
        <Carousel
         plugins={[
          AutoScroll({
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
         ]}
         opts={{
            align: "start",
            loop: true,
            
          }}
        >
        <CarouselContent >
         {testimonials.map((testimonial, index) => {
            return(
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-56">
                <Card className='bg-white/80 backdrop-blur-sm neobrutalism-2'>
                    <CardContent className='p-6'>
                        <blockquote>
                            <p className='text-yellow-700 italic'>&quot;{testimonial.text}&quot;</p>
                            <footer className="flex justify-between pt-6">
                              <Avatar >
                                <AvatarImage src={testimonial.img} className=""/>
                                <AvatarFallback></AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-semibold text-yellow-900'>{testimonial.author}</div>
                                <div className='text-sm text-yellow-600'>{testimonial.role}</div>
                              </div>
                              
                            </footer>
                        </blockquote>
                        
                    </CardContent>
                </Card>
            </CarouselItem>
            )
         })}
        </CarouselContent>
        </Carousel>
    </div>
    
  )
}

export default TestimonialCarousel
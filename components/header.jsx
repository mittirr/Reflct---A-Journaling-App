import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {SignInButton, SignedIn,SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { FolderOpen, PenBox } from 'lucide-react'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'


const Header = async () => {

    await checkUser();
  return (
    <header className='container mx-auto'>
        <nav className='flex justify-between items-center px-auto'>
            <Link href={"/"}>
            <Image src={"/logo.png"} alt="Reflect logo" width={70} height={70} className="w-auto h-auto object-contain"/>
            </Link>

            <div className='flex items-center gap-4 font-medium'>
                
                <SignedIn>
                    <Link href='/dashboard#collections'>
                        <Button variant='outline' className='flext items-center gap-2'>
                            <FolderOpen size={18}/>
                            <span className='hidden md:inline '>Collections</span>
                        </Button>
                    </Link>
                </SignedIn>

                <Link href='/journal/write'>
                    <Button variant='journal' className='flext items-center gap-2'>
                        <PenBox size={18} />
                        <span className='hidden md:inline '>Write new</span>
                    </Button>
                </Link>

                <SignedOut>
                    <SignInButton forceRedirectUrl='/dashboard' >
                        <Button variant="outline">Login</Button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserMenu/>
                </SignedIn>
            </div>
        </nav>
    </header>
  )
}

export default Header
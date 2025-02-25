import { ArrowLeft, ArrowLeftSquareIcon } from 'lucide-react';
import Link from 'next/link';
import { React, Suspense } from 'react'
import { BarLoader, DotLoader } from 'react-spinners';
// import { Suspense } from 'react/cjs/react.development';

export default function CollectionLayout({children}) => {
  return (
    <div className=" container mx-auto px-4 py-8">
        <div>
            <Link href='/dashboard' className="text-sm flex items-center gap-1 text-yellow-600 hover:text-yelloow-700 cursor-pointer">
                <ArrowLeft className="h-4 w-4"/> Back to Dashboard
            </Link>
        </div>
        <Suspense fallback={<DotLoader color="yellow" width={"100%"}/>}>
            {children}
        </Suspense>
    </div>
  )
};
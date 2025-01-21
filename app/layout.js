import "./globals.css";
import {Inter} from "next/font/google"
import Header from "@/components/header";
import {ClerkProvider} from "@clerk/nextjs"
const inter = Inter({ subset: ["latin"]});

export const metadata = {
  title: "Create Next App",
  description: "A journaling app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <div className="bg-[url('/graph-paper.svg')] opacity-20 fixed -z-10 inset-0 bg-yellow-200" />
          <Header/>
          <main className='min-h-screen'>{children}</main>
          <footer className='bg-yellow-500 py-12 bg-opacity-20'>
            <div className='mx-auto px-4 text-center font-medium text-gray-700'>
              <p>Made with 💜 by Mittir</p>
          </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "./globals.css";
import {Inter} from "next/font/google";
import Header from "@/components/header";
import Providers from "@/components/providers";

const inter = Inter({ 
  subset: ['latin'],
  preload: false,
});

export const metadata = {
  title: "Reflct",
  description: "A journaling app",
  icons: {
    icon: ['/favicon.png']
  } 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <KindeProvider
        clientId={process.env.KINDE_CLIENT_ID}
        domain={process.env.KINDE_ISSUER_URL}
        redirectUri={`${process.env.KINDE_SITE_URL}${process.env.KINDE_POST_LOGIN_REDIRECT_URL}`}
        logoutUri={`${process.env.KINDE_SITE_URL}${process.env.KINDE_POST_LOGOUT_REDIRECT_URL}`}
      >
        {children}
        <Analytics />
        <Toaster position="top-center" />
      </KindeProvider>
    </ThemeProvider>
  );
}

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = handleAuth({
  clientId: process.env.KINDE_CLIENT_ID,
  issuerUrl: process.env.KINDE_ISSUER_URL,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
  logoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
});
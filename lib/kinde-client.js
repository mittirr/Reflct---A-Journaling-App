"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const useKindeClient = () => {
  const { user, isLoading } = useKindeBrowserClient();
  
  if (!user) return { user: null, isLoading };
  
  return {
    user: {
      id: user?.id ?? '',
      email: user?.email ?? '',
      firstName: user?.given_name ?? '',
      lastName: user?.family_name ?? '',
      picture: user?.picture ?? '',
      name: user?.given_name
        ? `${user.given_name} ${user?.family_name || ''}`.trim()
        : user?.email,
    },
    isLoading
  };
};
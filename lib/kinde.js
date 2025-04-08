import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Get Kinde config and session management functions
const { getUser } = getKindeServerSession();

export const getKindeSession = async () => {
  try {
    const user = await getUser();
    if (!user) return null;
    return user; // raw session data from Kinde
  } catch (error) {
    console.error("Error getting Kinde session:", error);
    return null;
  }
};

export const getKindeUser = async () => {
  try {
    const session = await getKindeSession();
    if (!session) return null;
    return {
      id: session?.id ?? '',
      email: session?.email ?? '',
      firstName: session?.given_name ?? '',
      lastName: session?.family_name ?? '',
      picture: session?.picture ?? '',
      name: session?.given_name
        ? `${session.given_name} ${session?.family_name || ''}`.trim()
        : session?.email,
    };
  } catch (error) {
    console.error("Error getting Kinde user:", error);
    return null;
  }
};
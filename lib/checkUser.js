import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return null;

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        kindeUserId: user.id,
      },
    });
    if (loggedInUser) return loggedInUser;

    const name =
      user.given_name && user.family_name
        ? `${user.given_name} ${user.family_name}`
        : user.given_name || user.email;

    const newUser = await db.user.create({
      data: {
        kindeUserId: user.id,
        name,
        imageUrl: user.picture,
        email: user.email,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};
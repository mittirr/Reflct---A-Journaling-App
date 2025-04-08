"use client";

import { useState } from "react";
import { useKindeClient } from "@/lib/kinde-client";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CollectionDialog from "./collection-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user: kindeUser, isLoading } = useKindeClient();

  const handleSuccess = async (data) => {
    // ...existing code...
  };

  return (
    <div className="bg-background sticky top-0 border-b z-50">
      <div className="container flex items-center justify-between space-x-2 py-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold">
            Reflct
          </Link>
          {kindeUser ? (
            <Button onClick={() => router.push("/dashboard")} variant="ghost">
              Dashboard
            </Button>
          ) : null}
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          {kindeUser ? (
            <div className="flex items-center gap-2">
              <CollectionDialog onSuccess={handleSuccess} open={open} setOpen={setOpen} />
              <Avatar>
                <AvatarImage src={kindeUser?.picture} />
                <AvatarFallback>{kindeUser?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <LogoutLink className={buttonVariants({ variant: "ghost" })}>
                Logout
              </LogoutLink>
            </div>
          ) : (
            <LoginLink className={buttonVariants({ variant: "ghost" })}>
              Login
            </LoginLink>
          )}
        </div>
      </div>
    </div>
  );
}
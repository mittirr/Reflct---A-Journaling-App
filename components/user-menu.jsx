import React from 'react'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getKindeUser } from '@/lib/kinde'

const UserMenu = async () => {
  const user = await getKindeUser();
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : '';

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user?.picture} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <LogoutLink>
        <button className="text-sm font-medium hover:text-gray-600">Logout</button>
      </LogoutLink>
    </div>
  )
}

export default UserMenu
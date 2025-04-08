import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <RegisterLink>
        <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
          Sign Up
        </button>
      </RegisterLink>
    </div>
  )
}

export default SignUpPage
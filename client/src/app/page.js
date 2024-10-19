import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Banner from '@/components/banner'

function Page() {
  return (
    <div>
      <Banner />
      <div className="p-6 flex space-x-4">
        <Button asChild>
          <Link href="/signin"> sign in</Link>
        </Button>

        <Button asChild>
          <Link href="/client-signup"> Client Signup</Link>
        </Button>
        <Button asChild>
          <Link href="/appointments-page"> appointments </Link>
        </Button>
        <Button asChild>
          <Link href="/schedule-event"> Schedule Event </Link>
        </Button>


        <Button asChild>
          <Link href="/lab-reports"> lab reports </Link>
        </Button>

        <Button asChild>
          <Link href="/profile"> Profile </Link>
        </Button>
      </div>
    </div>
  )
}

export default Page
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
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
   </div>
  )
}

export default Page
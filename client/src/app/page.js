import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Banner from '@/components/banner'

function Page() {
  return (
    <div>
      <Banner />
      <Link href="/signin">Sign in | </Link>
      
   </div>
  )
}

export default Page
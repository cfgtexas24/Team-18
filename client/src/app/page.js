import MessageIconBubblePage from '@/components/message-icon-bubble-page'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
  <>
   <Link href="/signin"> sign in</Link>
   <MessageIconBubblePage />
  </>
  )
}

export default Page
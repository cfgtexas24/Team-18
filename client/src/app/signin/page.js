import SignInComponent from '@/components/sign-in'
import Banner from '@/components/banner'
import React from 'react'


function Page() {
  return (
    <div class="bg-[#F3ECEC] min-h-screen">
      <Banner />
      <SignInComponent />
    </div>
  )
}

export default Page
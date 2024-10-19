import ClientFormWithQuestions from '@/components/client-form-with-questions'
import Banner from '@/components/banner'
import React from 'react'

function Page() {
  return (
    <div class="bg-[#F3ECEC] min-h-screen">
      <Banner />
      <ClientFormWithQuestions />
    </div>
  )
}

export default Page
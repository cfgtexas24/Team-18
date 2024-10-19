import ClientFormWithQuestions from '@/components/client-form-with-questions'
import Banner from '@/components/banner'
import React from 'react'

function Page() {
  return (
    <div className="flex justify-center min-h-screen w-screen bg-gradient-to-b from-[#3A696E] to-[#B7C7C9]">
      <div class="my-[30px]">
      <ClientFormWithQuestions />
      </div>
    </div>
  )
}

export default Page
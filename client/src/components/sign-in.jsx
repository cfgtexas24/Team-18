'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignInComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // For demonstration, we'll just simulate a successful login
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // If login is successful, redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    (<Card className="bg-[#D3E2E4] w-full max-w-md mx-auto my-[20px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="bg-white"
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="bg-white"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full mt-4">Sign In</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/auth/reset-password"
          className="text-sm text-primary hover:underline">
          Forgot your password?
        </Link>
      </CardFooter>
    </Card>)
  );
}
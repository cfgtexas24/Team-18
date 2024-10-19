import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClipboardIcon, UserIcon, BeakerIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#F0E6FA] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-xl md:text-2xl font-bold text-purple-800">ClientCare</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Button variant="ghost" asChild><Link href="/signin">Sign In</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/client-signup">Client Signup</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/schedule-event">Events</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/appointments-page">Appointments</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/lab-reports">Lab Reports</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/profile">Profile</Link></Button></li>
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-6">
                <Button variant="ghost" asChild><Link href="/signin">Sign In</Link></Button>
                <Button variant="ghost" asChild><Link href="/client-signup">Client Signup</Link></Button>
                <Button variant="ghost" asChild><Link href="/schedule-event">Events</Link></Button>
                <Button variant="ghost" asChild><Link href="/appointments-page">Appointments</Link></Button>
                <Button variant="ghost" asChild><Link href="/lab-reports">Lab Reports</Link></Button>
                <Button variant="ghost" asChild><Link href="/profile">Profile</Link></Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-purple-100 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">Welcome to ClientCare</h2>
            <p className="text-lg md:text-xl text-purple-600 mb-8">Your trusted partner in midwifery care management</p>
            <Button size="lg" asChild>
              <Link href="/client-signup">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base">Schedule and manage your appointments with ease.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl">
                    <BeakerIcon className="mr-2 h-5 w-5" />
                    Lab Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base">Access and review your lab reports securely.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl">
                    <UserIcon className="mr-2 h-5 w-5" />
                    Client Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base">Manage your personal information and care preferences.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl">
                    <ClipboardIcon className="mr-2 h-5 w-5" />
                    Care Plans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base">View and track your personalized care plans.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-800 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">&copy; 2024 ClientCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
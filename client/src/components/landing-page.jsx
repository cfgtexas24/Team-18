'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import { CalendarIcon, ClipboardIcon, UserIcon, BeakerIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function LandingPageComponent() {
  return (
    (<div className="min-h-screen flex flex-col">
      <header className="bg-[#F0E6FA] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-xl md:text-2xl font-bold text-[#A26B61]">ABIDE</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Button variant="ghost" asChild><Link href="/signin">Sign In</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/client-signup">Client Signup</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/appointments-page">Appointments</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/lab-reports">Lab Reports</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/profile">Profile</Link></Button></li>
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-6">
                <Button variant="ghost" asChild><Link href="/signin">Sign In</Link></Button>
                <Button variant="ghost" asChild><Link href="/client-signup">Client Signup</Link></Button>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 ">Welcome to ABIDE</h2>
            <p className="text-lg md:text-xl text-[#A26B61]">Your trusted partner in midwifery care management</p>
            <Button size="lg" asChild>
              <Link href="/client-signup">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-6 text-left w-full"
                asChild>
                <Link href="/appointments">
                  <CalendarIcon className="mb-4 h-8 w-8 text-purple-600" />
                  <h4 className="text-lg font-semibold mb-2">Appointments</h4>
                  <p className="text-sm text-muted-foreground">Schedule and manage your appointments with ease.</p>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-6 text-left w-full"
                asChild>
                <Link href="/lab-reports">
                  <BeakerIcon className="mb-4 h-8 w-8 text-purple-600" />
                  <h4 className="text-lg font-semibold mb-2">Lab Reports</h4>
                  <p className="text-sm text-muted-foreground">Access and review your lab reports securely.</p>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-6 text-left w-full"
                asChild>
                <Link href="/profile">
                  <UserIcon className="mb-4 h-8 w-8 text-purple-600" />
                  <h4 className="text-lg font-semibold mb-2">Client Profiles</h4>
                  <p className="text-sm text-muted-foreground">Manage your personal information and care preferences.</p>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center p-6 text-left w-full"
                asChild>
                <Link href="/care-plans">
                  <ClipboardIcon className="mb-4 h-8 w-8 text-purple-600" />
                  <h4 className="text-lg font-semibold mb-2">Care Plans</h4>
                  <p className="text-sm text-muted-foreground">View and track your personalized care plans.</p>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-purple-800 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">&copy; 2024 ClientCare. All rights reserved.</p>
        </div>
      </footer>
    </div>)
  );
}
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
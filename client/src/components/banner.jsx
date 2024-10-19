import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import { CalendarIcon, ClipboardIcon, UserIcon, BeakerIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from '../images/logo2.png';

function Banner() {
    return ( 
        <div>
        <header className="bg-[#477377] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-xl md:text-2xl font-bold text-white">ABIDE</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4 text-white">
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

        </div>
     );
}

export default Banner;
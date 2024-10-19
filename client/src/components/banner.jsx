// components/banner.jsx
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useContext } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthContext } from './AuthContext';
import LangSelect from "./LangSelect";

function Banner() {
  const { isAuthenticated, logout } = useContext(AuthContext);


  return (
    <header className="bg-secondary py-2 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-4">
          <img src="/images/logo2.png" alt="Logo" className="h-8 w-8 md:h-16 md:w-16" />
          <h1 className="text-xl font-bold text-secondary-foreground" 
          style={ { fontFamily: 'horn', fontWeight: 'bold', fontSize: '28px'} }>
            AbideCare
          </h1>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-2 text-secondary-foreground">
            {!isAuthenticated ? (
              <>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/client-signup">Register</Link>
                  </Button>
                </li>
                <LangSelect />
              </>
            ) : (
              <>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/appointments-page">Appointments</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/schedule-event">Events</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/lab-reports">Lab Reports</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/profile">Profile</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" onClick={logout}>
                    Sign Out
                  </Button>
                </li>
                <LangSelect />
              </>
            )}
          </ul>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6 text-secondary-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="mt-6 flex flex-col space-y-4">
              {!isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/client-signup">Register</Link>
                  </Button>
                  <LangSelect />
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/appointments-page">Appointments</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/schedule-event">Events</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/lab-reports">Lab Reports</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button variant="ghost" onClick={logout}>
                    Sign Out
                  </Button>
                  <LangSelect />
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Banner;

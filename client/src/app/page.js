import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ClipboardIcon, UserIcon, BeakerIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const services = [
  {
    title: 'Appointments',
    description: 'Schedule and manage your appointments with ease.',
    icon: CalendarIcon,
    link: '/appointments-page',
  },
  {
    title: 'Lab Reports',
    description: 'Access and review your lab reports securely.',
    icon: BeakerIcon,
    link: '/lab-reports',
  },
  {
    title: 'Client Profiles',
    description: 'Manage your personal information and care preferences.',
    icon: UserIcon,
    link: '/profile',
  },
  {
    title: 'Care Plans',
    description: 'View and track your personalized care plans.',
    icon: ClipboardIcon,
    link: '/care-plans',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-[#faf8f8]">
      <main className="flex-grow">
        <section className="h-[70vh] bg-[#F4E8E7] py-12 md:py-20">
          <div className="container mx-auto flex h-full flex-col items-start justify-center px-4 text-left">
            <h2 className="text[#A26B61] mb-4 text-3xl font-bold md:text-6xl">Welcome to Abide</h2>
            <p className="mb-8 text-lg text-[#A26B61] md:text-xl">
              Your trusted partner in midwifery care management
            </p>
            <Button size="lg" asChild variant="default">
              <Link href="/client-signup">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h3 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl">
              Our Services
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {services.map((service, index) => (
                <Link href={service.link} key={index}>
                  <Card className="h-full p-4 transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CalendarIcon className="mr-2 h-5 w-5" />

                      <CardTitle className="flex items-center text-lg md:text-xl">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

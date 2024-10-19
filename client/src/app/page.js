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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#3A696E] to-[#D3E2E4]">
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="mb-4 text-3xl font-bold text-secondary md:text-6xl">Welcome to AbideCare</h2>
            <p className="mb-8 text-lg text-secondary/70 md:text-xl">
              Your trusted partner in midwifery care management
            </p>
            <Button size="lg" asChild variant="default">
              <Link href="/client-signup">Get Started</Link>
            </Button>
          </div>
          <svg
            className="w-full max-w-md md:max-w-lg"
            viewBox="0 0 587 618"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_2)">
              <path
                d="M348.29 415.42C359.12 423.38 372.1 424 377.28 416.79C382.45 409.59 377.86 397.3 367.02 389.34C362.73 386.1 357.72 383.97 352.39 383.15L306.05 350.02L290.62 373.05L337.94 403.26C340.36 408.13 343.91 412.3 348.29 415.42Z"
                fill="#A26B61"
              />
              <path
                d="M240.74 164.81C225.44 166.75 214.62 180.75 216.6 196.04L230.66 383.82L342.62 430.82L357.68 411.39L280.31 354.76L291.95 207.94C290.75 181.37 267.13 161.48 240.74 164.82V164.81Z"
                fill="#F4E8E9"
              />
              <path d="M190.24 170.39L244.67 188.28V109.93H195.28L190.24 170.39Z" fill="#A26B61" />
              <path
                d="M237.93 131.61C267.886 131.61 292.17 107.326 292.17 77.37C292.17 47.4141 267.886 23.13 237.93 23.13C207.974 23.13 183.69 47.4141 183.69 77.37C183.69 107.326 207.974 131.61 237.93 131.61Z"
                fill="#A26B61"
              />
              <path
                d="M223.04 72C232.13 71.73 238.08 62.54 241.61 54.17C245.14 45.79 248.77 36.17 257.18 32.71C264.07 29.88 276.22 48.99 281.66 43.9C287.32 38.6 281.8 11.34 275.79 6.44C269.78 1.55 261.55 0.590003 253.8 0.240003C234.9 -0.629997 215.88 0.900002 197.36 4.77C185.9 7.16 174.1 10.76 165.84 19.05C155.38 29.56 152.69 45.42 151.94 60.23C151.17 75.39 152.04 91.27 159.41 104.54C166.78 117.81 182.22 127.59 197.01 124.21C198.5 116.17 196.98 107.92 196.41 99.75C195.84 91.59 196.44 82.77 201.42 76.28C206.4 69.79 217.05 67.21 222.85 72.97"
                fill="#2F2E41"
              />
              <path
                d="M156.3 90.79C150.87 86.81 144.38 83.49 137.7 84.3C130.48 85.18 124.39 91.12 122.53 98.15C120.67 105.18 122.75 112.93 127.22 118.67C131.68 124.41 138.32 128.23 145.34 130.11C149.4 131.2 153.86 131.66 157.72 130C163.43 127.55 166.5 120.26 164.26 114.46"
                fill="#2F2E41"
              />
              <path
                d="M211.2 385.92L191.91 387.92C191.91 387.92 143.43 459.76 191.91 518.94L192.58 616.3H282.37C282.37 616.3 319.61 506.97 299.66 467.73L318.28 456.42L211.2 385.92Z"
                fill="#2F2E41"
              />
              <path
                d="M208.63 405.25L192.69 416.29C192.69 416.29 155.78 514.78 255.84 531.09L303.35 616.07L382.02 616.29C382.02 616.29 361.96 459.05 325.56 434.29L336.43 415.41L208.63 405.25Z"
                fill="#2F2E41"
              />
              <path
                d="M249.11 149.82L183.68 136.87L162.64 209.68C162.64 209.68 232.47 346.69 191.9 387.92L318.27 456.42C318.27 456.42 455.94 381.93 302.31 272.86C302.31 272.86 328.25 241.6 298.98 214.33C269.72 187.06 249.1 149.82 249.1 149.82H249.11Z"
                fill="#F4E8E7"
              />
              <path
                d="M308.17 470.65C319 478.61 331.98 479.23 337.16 472.02C342.33 464.82 337.74 452.53 326.9 444.57C322.61 441.33 317.6 439.2 312.27 438.38L265.93 405.25L250.5 428.28L297.82 458.49C300.24 463.36 303.79 467.53 308.17 470.65Z"
                fill="#A26B61"
              />
              <path
                d="M159.82 164.81C144.52 166.75 133.7 180.75 135.68 196.04L149.74 383.82L289.96 459.75L299.26 427.9L199.38 354.75L211.02 207.93C209.82 181.36 186.2 161.47 159.81 164.81H159.82Z"
                fill="#F4E8E7"
              />
              <path
                d="M537.65 616.29C537.65 616.95 537.12 617.48 536.46 617.48H1.19C0.53 617.48 0 616.95 0 616.29C0 615.63 0.53 615.1 1.19 615.1H536.46C537.12 615.1 537.65 615.63 537.65 616.29Z"
                fill="#2F2E41"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_2">
                <rect width="586.17" height="617.48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h3 className="mb-8 text-center text-2xl font-bold text-secondary md:mb-12 md:text-3xl">
              Our Services
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <Link href={service.link} key={index}>
                  <Card className="h-full p-4 transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg md:text-xl">
                        <service.icon className="mr-2 h-5 w-5" />
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
'use client'

import { useState } from 'react'
import { CalendarIcon, Clock, MapPin, MoreVertical, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const appointments = [
  {
    id: 1,
    title: 'Prenatal Checkup',
    date: '2024-10-20',
    time: '10:00 AM',
    location: 'Main Clinic',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Ultrasound',
    date: '2024-10-25',
    time: '2:30 PM',
    location: 'Imaging Center',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Postpartum Follow-up',
    date: '2024-09-15',
    time: '11:00 AM',
    location: 'Main Clinic',
    status: 'completed',
  },
]

export default function MobileAppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const filteredAppointments = appointments.filter((appointment) => appointment.status === activeTab)

  return (
    (<div className="flex flex-col h-screen bg-[#fffbfb]">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">My Appointments</h1>
        <Button size="icon" variant="ghost">
          <Plus className="h-5 w-5" />
        </Button>
      </header>
      <Tabs
        defaultValue="upcoming"
        className="flex-1 flex flex-col"
        onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sticky top-0 z-10 bg-background">
          <TabsTrigger value="upcoming" className="text-sm py-3">Upcoming</TabsTrigger>
          <TabsTrigger value="completed" className="text-sm py-3">Completed</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="upcoming" className="p-4 pt-0">
            <AppointmentList appointments={filteredAppointments} />
          </TabsContent>

          <TabsContent value="completed" className="p-4 pt-0">
            <AppointmentList appointments={filteredAppointments} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>)
  );
}

function AppointmentList({ appointments }) {
  if (appointments.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No appointments found.</p>;
  }

  return (
    (<div className="space-y-4 mt-4">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>)
  );
}

function AppointmentCard({ appointment }) {
  return (
    (<Card className="relative">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{appointment.title}</h3>
          <Badge
            variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}
            className="text-xs">
            {appointment.status}
          </Badge>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {appointment.date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {appointment.time}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            {appointment.location}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button variant="outline" size="sm" className="text-xs">View Details</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
              <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>)
  );
}
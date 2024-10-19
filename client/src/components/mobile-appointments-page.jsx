'use client';

import { useEffect, useState } from 'react';
import { CalendarIcon, Clock, MapPin, MoreVertical, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MobileAppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/appointments');
      const data = await response.json();
      setAppointments(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredAppointments(appointments.filter((appointment) => appointment.status === activeTab));
  }, [appointments, activeTab]);

  const handleNewAppointment = async (formData) => {
    try {
      const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }
      const newAppointment = await response.json();
      setAppointments([...appointments, newAppointment]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex h-screen flex-col bg-secondary">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">My Appointments</h1>
        <Button size="icon" variant="ghost" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5" />
        </Button>
      </header>
      <Tabs defaultValue="upcoming" className="flex flex-1 flex-col" onValueChange={setActiveTab}>
        <TabsList className="sticky top-0 z-10 grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="bg-background">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="bg-background">
            Completed
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="upcoming">
            <AppointmentList appointments={filteredAppointments} />
          </TabsContent>

          <TabsContent value="completed">
            <AppointmentList appointments={filteredAppointments} />
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewAppointment}
      />
    </div>
  );
}

function AppointmentList({ appointments }) {
  if (appointments.length === 0) {
    return <p className="mt-8 text-center text-muted-foreground">No appointments found.</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}

function AppointmentCard({ appointment }) {
  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold">{appointment.title}</h3>
          <Badge
            variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}
            className="text-xs"
          >
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
        <div className="mt-4 flex items-center justify-between">
          <Button variant="outline" size="sm" className="text-xs">
            View Details
          </Button>
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
    </Card>
  );
}

function NewAppointmentModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, status: 'upcoming' });
    setFormData({ title: '', date: '', time: '', location: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

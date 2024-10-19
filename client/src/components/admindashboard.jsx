'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Users } from 'lucide-react'
import PatientsTable from './user-table'
import Link from 'next/link'

export default function Component() {
  const [appointments, setAppointments] = useState([
    { id: 1, title: 'Dr. Visit', date: '2023-05-15', time: '10:00 AM' },
    { id: 2, title: 'Dental Checkup', date: '2023-05-17', time: '2:00 PM' },
  ])
  const [events, setEvents] = useState([
    { id: 1, title: 'Staff Meeting', date: '2023-05-16', time: '2:00 PM' },
    { id: 2, title: 'Training Session', date: '2023-05-18', time: '9:00 AM' },
  ])
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 35 },
    { id: 2, name: 'Jane Smith', age: 28 },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [newAppointment, setNewAppointment] = useState({ title: '', date: '', time: '' })
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' })
  const [newPatient, setNewPatient] = useState({ name: '', age: '' })
  const [editingId, setEditingId] = useState(null)
  const [editingType, setEditingType] = useState(null)

  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.date && newAppointment.time) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now() }])
      setNewAppointment({ title: '', date: '', time: '' })
    }
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { ...newEvent, id: Date.now() }])
      setNewEvent({ title: '', date: '', time: '' })
    }
  }

  const handleEditItem = (id, type) => {
    const item = type === 'appointment' 
      ? appointments.find(a => a.id === id)
      : events.find(e => e.id === id)
    if (type === 'appointment') {
      setNewAppointment(item)
    } else {
      setNewEvent(item)
    }
    setEditingId(id)
    setEditingType(type)
  }

  const handleUpdateItem = () => {
    if (editingType === 'appointment') {
      setAppointments(appointments.map(a => a.id === editingId ? newAppointment : a))
      setNewAppointment({ title: '', date: '', time: '' })
    } else {
      setEvents(events.map(e => e.id === editingId ? newEvent : e))
      setNewEvent({ title: '', date: '', time: '' })
    }
    setEditingId(null)
    setEditingType(null)
  }

  const handleRemoveItem = (id, type) => {
    if (type === 'appointment') {
      setAppointments(appointments.filter(a => a.id !== id))
    } else {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age) {
      setPatients([...patients, { ...newPatient, id: Date.now() }])
      setNewPatient({ name: '', age: '' })
    }
  }

  const handleRemovePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id))
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderItemList = (items, type) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
          <div>
            <span className="font-bold">{item.title}</span> - {item.date} at {item.time}
          </div>
          <div>
            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditItem(item.id, type)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.id, type)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">
            <Calendar className="w-4 h-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="events">
            <Clock className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="patients">
            <Users className="w-4 h-4 mr-2" />
            Patients
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Manage your appointments here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Appointment Title"
                    value={newAppointment.title}
                    onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                  />
                  <Input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                  <Input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                  {editingId && editingType === 'appointment' ? (
                    <Button onClick={handleUpdateItem}>Update</Button>
                  ) : (
                    <Button onClick={handleAddAppointment}>Add</Button>
                  )}
                </div>
                {renderItemList(appointments, 'appointment')}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Manage your events here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                  {editingId && editingType === 'event' ? (
                    <Button onClick={handleUpdateItem}>Update</Button>
                  ) : (
                    <Button onClick={handleAddEvent}>Add</Button>
                  )}
                </div>
                {renderItemList(events, 'event')}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients">
         <div>
          <div className='flex items-center gap-2'>
            <Button asChild> 
              <Link href="/admin/dashboard/metrics">
              Metrics
            </Link>
            
            </Button>
            </div>
           <PatientsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
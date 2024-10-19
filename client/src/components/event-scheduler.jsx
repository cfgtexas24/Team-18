"use client";
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EventScheduler() {
  const [events, setEvents] = useState([
    { id: 1, title: "Team Meeting", date: undefined },
    { id: 2, title: "Project Deadline", date: undefined },
    { id: 3, title: "Client Presentation", date: undefined },
  ])

  const updateEventDate = (id, date) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, date } : event))
  }

  return (
    (<div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Event Scheduler</h1>
      <div className="space-y-4">
        {events.map(event => (
          <Card key={event.id} className="w-full">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !event.date && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {event.date ? format(event.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={event.date}
                    onSelect={(date) => updateEventDate(event.id, date)}
                    initialFocus />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>)
  );
}
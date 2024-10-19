"use client";
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const initialEvents = [
  { id: 1, title: "Team Meeting", description: "Discuss project progress" },
  { id: 2, title: "Client Presentation", description: "Present new features" },
  { id: 3, title: "Workshop", description: "React best practices" },
]

export default function EventSchedulerComponent() {
  const [events, setEvents] = useState(initialEvents)
  const [selectedDates, setSelectedDates] = useState({})

  const handleDateSelect = (date, eventId) => {
    setSelectedDates((prev) => ({ ...prev, [eventId]: date }))
  }

  const handleSubmit = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
  }

  return (
    (<div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Event Scheduler</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="w-full">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDates[event.id] && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDates[event.id] ? (
                      format(selectedDates[event.id], "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDates[event.id]}
                    onSelect={(date) => handleDateSelect(date, event.id)}
                    initialFocus />
                </PopoverContent>
              </Popover>
            </CardContent>
            {selectedDates[event.id] && (
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubmit(event.id)}>
                  Submit
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>)
  );
}
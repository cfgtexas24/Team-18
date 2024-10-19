"use client";
import { useState } from "react"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  const [selectedDateTimes, setSelectedDateTimes] = useState({})

  const handleDateTimeSelect = (dateTime, eventId) => {
    setSelectedDateTimes((prev) => ({ ...prev, [eventId]: dateTime }))
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
                      !selectedDateTimes[event.id] && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <ClockIcon className="mr-2 h-4 w-4" />
                    {selectedDateTimes[event.id] ? (
                      format(selectedDateTimes[event.id], "PPP p")
                    ) : (
                      <span>Pick a date and time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker
                    selected={selectedDateTimes[event.id]}
                    onChange={(date) => handleDateTimeSelect(date, event.id)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    inline />
                </PopoverContent>
              </Popover>
            </CardContent>
            {selectedDateTimes[event.id] && (
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
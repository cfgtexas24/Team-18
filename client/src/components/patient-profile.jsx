'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Phone, Mail, MapPin, Droplet, AlertCircle, Pill } from "lucide-react"

export default function PatientProfileComponent() {
  return (
    <div className="container mx-auto my-[20px] p-4 space-y-6">

      {/* Centered Profile Section */}
      <Card className="w-full md:w-3/4 mx-auto py-6"> {/* Adjusted width and centering */}
        <CardContent>
          <div className="flex flex-col items-center text-center space-y-4"> {/* Centering elements */}
            <Avatar className="w-32 h-32">
              <AvatarImage src="/placeholder.svg?height=120&width=128" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 35 years old
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> (555) 123-4567
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> john.doe@example.com
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> New York, NY
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Medical Info and Appointments */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplet className="text-primary" />
              <span className="font-semibold">Blood Type:</span> A+
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-primary" />
                <span className="font-semibold">Allergies:</span>
              </div>
              <ul className="list-disc list-inside pl-5 space-y-1">
                <li>Penicillin</li>
                <li>Peanuts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Pill className="text-primary" />
                <span className="font-semibold">Current Medications:</span>
              </div>
              <ul className="list-disc list-inside pl-5 space-y-1">
                <li>Lisinopril (10mg, daily)</li>
                <li>Metformin (500mg, twice daily)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            {[
              { date: "2024-10-25", time: "10:00 AM", doctor: "Dr. Smith", type: "Annual Check-up" },
              { date: "2024-11-05", time: "2:30 PM", doctor: "Dr. Johnson", type: "Cardiology Follow-up" },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{appointment.type}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                </div>
                <div className="text-right">
                  <p>{new Date(appointment.date).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4">
            <Button className="w-full">Schedule New Appointment</Button>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Last updated: October 15, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Test</th>
                    <th className="text-left p-2">Result</th>
                    <th className="text-left p-2">Reference Range</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { test: "Blood Glucose", result: "95 mg/dL", range: "70-100 mg/dL", status: "Normal" },
                    { test: "Cholesterol", result: "210 mg/dL", range: "<200 mg/dL", status: "High" },
                    { test: "Blood Pressure", result: "128/82 mmHg", range: "<120/80 mmHg", status: "Elevated" },
                  ].map((test, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{test.test}</td>
                      <td className="p-2">{test.result}</td>
                      <td className="p-2">{test.range}</td>
                      <td className="p-2">
                        <Badge
                          variant={test.status === "Normal" ? "success" : test.status === "High" ? "destructive" : "warning"}>
                          {test.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

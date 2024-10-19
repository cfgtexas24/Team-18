'use client'

import { useState } from 'react'
import { Mail, Phone } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Banner } from "@/components/banner"

export default function ClientFormWithQuestions() {
  const [activeSection, setActiveSection] = useState('personal')

  const sections = [
    { id: 'personal', title: 'Personal' },
    { id: 'contact', title: 'Contact' },
    { id: 'additional', title: 'Additional' },
    { id: 'questions', title: 'Questions' },
  ]

  return (
    (<div clasname="flex flex-col h-screen bg-[#fffbfb]">
    <div className="bg-[#D3E2E4] max-w-md mx-auto my-[20px] rounded-md p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Client Information</h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="text-sm">
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="clientType">Client Type</Label>
            <Select id="clientType">
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Client Type" className="bg-white"></SelectValue>
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="New Client">New Client</SelectItem>
                <SelectItem value="Returning Client">Returning Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="name" >Name</Label>
            <Input className="bg-white" id="name" placeholder="Full Name" />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input className="bg-white" id="dob" type="date" />
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="flex">
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="bg-white rounded-r-none" />
              <Button type="button" variant="outline" className="rounded-l-none">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <div className="flex">
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                className="bg-white rounded-r-none" />
              <Button type="button" variant="outline" className="rounded-l-none">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter your address" className="bg-white rounded-r-none" />
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="language">Primary Language</Label>
            <Select id="language">
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Language"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input className="bg-white" id="occupation" placeholder="Enter occupation" />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="mailingList"
              className="rounded border-gray-300 text-primary focus:ring-primary" />
            <Label htmlFor="mailingList">Join mailing list</Label>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6 mt-4">
          <div className="space-y-4">
            <Label>How did you hear about us?</Label>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="bg-white" value="option-1" id="option-1" />
                <Label htmlFor="option-1">Friend or Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="bg-white" value="option-2" id="option-2" />
                <Label htmlFor="option-2">Internet Search</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="bg-white" value="option-3" id="option-3" />
                <Label htmlFor="option-3">Social Media</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="bg-white" value="option-4" id="option-4" />
                <Label htmlFor="option-4">Other</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferences">Any specific preferences or concerns?</Label>
            <Textarea className="bg-white" id="preferences" placeholder="Enter your preferences or concerns" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="questions">Do you have any questions for us?</Label>
            <Textarea className="bg-white" id="questions" placeholder="Enter your questions" />
          </div>
        </TabsContent>
      </Tabs>
      <Button className="w-full">Save Information</Button>
    </div>
    </div>)
  );
}
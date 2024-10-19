'use client'

import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

export default function ClientFormWithQuestions() {
  const [activeSection, setActiveSection] = useState('personal');
  const [customQuestions, setCustomQuestions] = useState([]);

  const sections = [
    { id: 'personal', title: 'Personal' },
    { id: 'contact', title: 'Contact' },
    { id: 'history', title: 'History' },
    { id: 'other', title: 'Other' },
    { id: 'custom', title: 'Custom' },
  ];

  useEffect(() => {
    const fetchCustomQuestions = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`);
      const data = await response.json();
      setCustomQuestions(data);
    };
    fetchCustomQuestions();
  }, []);

  return (
    <div clasname="flex flex-col h-screen">
      <div className="mx-auto my-[20px] w-full max-w-md space-y-6 rounded-lg bg-[#D3E2E4] p-6">
        <h1 className="text-center text-2xl font-bold">Client Information</h1>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="text-sm">
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Personal Section */}
          <TabsContent value="personal" className="mt-4 space-y-4">
            <div>
              {/* New or Returning Client */}
              <Label htmlFor="clientType">Client Type</Label>
              <Select id="clientType">
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Client Type" className="bg-white"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New Client">New Client</SelectItem>
                  <SelectItem value="Returning Client">Returning Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Client Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input className="bg-white" id="name" placeholder="Full Name" />
            </div>
            {/* Client DOB */}
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input className="bg-white" id="dob" type="date" />
            </div>
            {/* Client Race */}
            <div>
              <Label htmlFor="race">Race</Label>
              <Select id="race">
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Race" className="bg-white"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White">White (Caucasian)</SelectItem>
                  <SelectItem value="Black or African American">
                    Black or African American
                  </SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="Native American or Pacific Islander">
                    Native American or Pacific Islander
                  </SelectItem>
                  <SelectItem value="Multi-Racial">Multi-Racial</SelectItem>
                  <SelectItem value="Prefer Not">Prefer not to Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Client Ethnicity */}
            <div>
              <Label htmlFor="ethnicity">Ethnicity</Label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Ethnicity" className="bg-white"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hispanic/Latino">Hispanic/Latino</SelectItem>
                  <SelectItem value="Not Hispanic/Latino">Not Hispanic/Latino</SelectItem>
                  <SelectItem value="Prefer Not">Prefer not to Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-4 space-y-4">
            {/* Client Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex">
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="rounded-r-none bg-white"
                />
                <Button type="button" variant="outline" className="rounded-l-none">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* Client Phone Number */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="flex">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="rounded-r-none bg-white"
                />
                <Button type="button" variant="outline" className="rounded-l-none">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* Client Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                className="rounded-r-none bg-white"
              />
            </div>
            {/* Join Mailing List */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="mailingList"
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="mailingList">Join mailing list</Label>
            </div>
          </TabsContent>

          {/* History Section */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div>
              {/* Start of Personal History section */}
              <div className="font-size-xl my-5 font-bold">Personal History</div>
              {/* Primary Language */}
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
              {/* Social Benefits Status */}
              <Label>Do you collect SNAP or WIC benefits?</Label>
              <RadioGroup defaultValue="option-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-2" id="option-2" />
                  <Label htmlFor="option-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Employment Status */}
            <div>
              <Label>Are you employed?</Label>
              <RadioGroup defaultValue="option-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-2" id="option-2" />
                  <Label htmlFor="option-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              {/* Insured Status */}
              <Label>Are you insured?</Label>
              <RadioGroup defaultValue="option-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-2" id="option-2" />
                  <Label htmlFor="option-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Insurance Name */}
            <div className="space-y-2">
              <Label htmlFor="insurance-name">
                If yes, what is the name of your insurance provider?
              </Label>
              <Input className="bg-white" id="insurance-name" placeholder="Insurer's Name" />
            </div>

            {/* Start of Health History Section */}
            <div className="font-size-xl my-20 font-bold">Health History</div>
            <div>
              {/* Disability Status */}
              <Label>Do you have any pre-existing conditions or disabilities?</Label>
              <RadioGroup defaultValue="option-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-2" id="option-2" />
                  <Label htmlFor="option-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Disability Specification */}
            <div className="space-y-2">
              <Label htmlFor="conditions">If yes, please specify below.</Label>
              <Input className="bg-white" id="conditions" placeholder="Specify Here" />
            </div>
            {/* Previous Pregnancy Issues */}
            <div>
              <Label>Have you had any previous miscarriages or pregnancy complications?</Label>
              <RadioGroup defaultValue="option-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="bg-white" value="option-2" id="option-2" />
                  <Label htmlFor="option-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Pregnancy Issue Specification */}
            <div className="space-y-2">
              <Label htmlFor="conditions">If yes, please specify below.</Label>
              <Input className="bg-white" id="conditions" placeholder="Specify Here" />
            </div>
          </TabsContent>

          {/* Other Questions */}
          <TabsContent value="other" className="mt-4 space-y-6">
            {/* How did you hear about us? */}
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
            {/* Preferences or Concerns */}
            <div className="space-y-2">
              <Label htmlFor="preferences">Any specific preferences or concerns?</Label>
              <Textarea
                className="bg-white"
                id="preferences"
                placeholder="Enter your preferences or concerns"
              />
            </div>
            {/* Questions for Us */}
            <div className="space-y-2">
              <Label htmlFor="questions">Do you have any questions for us?</Label>
              <Textarea className="bg-white" id="questions" placeholder="Enter your questions" />
            </div>
          </TabsContent>
          <TabsContent value="custom" className="mt-4 space-y-4">
            <div>
              {customQuestions.map((question) => (
                <div key={question.id}>
                  <Label htmlFor={question.id}>{question.question}</Label>
                  {question.type === 'text' && (
                    <Input
                      id={question.id}
                      className="bg-white"
                      placeholder={question.placeholder}
                    />
                  )}
                  {question.type === 'textarea' && (
                    <Textarea
                      id={question.id}
                      className="bg-white"
                      placeholder={question.placeholder}
                    />
                  )}
                  {question.type === 'select' && (
                    <Select id={question.id}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder={question.placeholder}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {question.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {question.type === 'checkbox' && (
                    <Checkbox id={question.id} label={question.label} />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <Button className="w-full" asChild>
          <Link href="/appointments-page">Save and Continue</Link>
        </Button>
      </div>
    </div>
  );
}
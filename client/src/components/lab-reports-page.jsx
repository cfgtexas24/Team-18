'use client'

import { useState } from 'react'
import { FileText, ChevronRight, Search, Filter, ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const labReports = [
  {
    id: 1,
    title: 'Complete Blood Count (CBC)',
    date: '2024-10-15',
    status: 'normal',
    category: 'Blood Test',
    pdfUrl: '/api/lab-reports/1.pdf',
  },
  {
    id: 2,
    title: 'Thyroid Function Test',
    date: '2024-10-10',
    status: 'abnormal',
    category: 'Hormone Test',
    pdfUrl: '/api/lab-reports/2.pdf',
  },
  {
    id: 3,
    title: 'Lipid Panel',
    date: '2024-09-30',
    status: 'normal',
    category: 'Blood Test',
    pdfUrl: '/api/lab-reports/3.pdf',
  },
  {
    id: 4,
    title: 'Urinalysis',
    date: '2024-09-25',
    status: 'pending',
    category: 'Urine Test',
    pdfUrl: '/api/lab-reports/4.pdf',
  },
  {
    id: 5,
    title: 'Vitamin D Test',
    date: '2024-09-20',
    status: 'low',
    category: 'Vitamin Test',
    pdfUrl: '/api/lab-reports/5.pdf',
  },
]

export default function LabReportsPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredReports, setFilteredReports] = useState(labReports)

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = labReports.filter(report => 
      report.title.toLowerCase().includes(term) || 
      report.category.toLowerCase().includes(term))
    setFilteredReports(filtered)
  }

  return (
    (<div className="flex flex-col h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Lab Reports</h1>
        <Button size="icon" variant="ghost">
          <Filter className="h-5 w-5" />
        </Button>
      </header>
      <div className="p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch} />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredReports.map((report) => (
            <LabReportCard key={report.id} report={report} />
          ))}
          {filteredReports.length === 0 && (
            <p className="text-center text-muted-foreground">No lab reports found.</p>
          )}
        </div>
      </ScrollArea>
    </div>)
  );
}

function LabReportCard({ report }) {
  return (
    (<Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.category}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{report.title}</DialogTitle>
                <DialogDescription>
                  View or download the full lab report PDF.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">Date: {report.date}</p>
                <StatusBadge status={report.status} />
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <Button asChild>
                  <Link href={report.pdfUrl} target="_blank" rel="noopener noreferrer">
                    View PDF <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{report.date}</p>
          <StatusBadge status={report.status} />
        </div>
      </CardContent>
    </Card>)
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    normal: 'bg-green-100 text-green-800',
    abnormal: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  }

  return (
    (<Badge className={`text-xs ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>)
  );
}
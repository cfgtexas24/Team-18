"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const numericFields = ['age', 'premature_births', 'late_births', 'miscarriages', 'successful_births']
const categoricalFields = ['race', 'gender', 'ethnicity', 'primary_language', 'employment_status']
const booleanFields = ['insured', 'social_benefits', 'high_risk', 'post_pregnancy']

export default function PatientDataChart() {
  const [patientsData, setPatientsData] = useState([])
  const [xAxis, setXAxis] = useState('age')
  const [yAxis, setYAxis] = useState('successful_births')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/admin/patients')
      const data = await response.json()
      setPatientsData(data)
    }
    fetchData()
  }, [])

  const getFieldOptions = () => {
    return [...numericFields, ...categoricalFields, ...booleanFields]
  }

  const processDataForChart = () => {
    return patientsData.map(patient => ({
      x: patient[xAxis],
      y: patient[yAxis],
    }))
  }

  const renderCustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p>{`${xAxis}: ${payload[0].payload.x}`}</p>
          <p>{`${yAxis}: ${payload[0].payload.y}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Patient Data Visualization</CardTitle>
        <CardDescription>Select variables to visualize patient data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="x-axis">X Axis</Label>
            <Select onValueChange={(value) => setXAxis(value)} value={xAxis}>
              <SelectTrigger id="x-axis">
                <SelectValue placeholder="Select X Axis" />
              </SelectTrigger>
              <SelectContent>
                {getFieldOptions().map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="y-axis">Y Axis</Label>
            <Select onValueChange={(value) => setYAxis(value)} value={yAxis}>
              <SelectTrigger id="y-axis">
                <SelectValue placeholder="Select Y Axis" />
              </SelectTrigger>
              <SelectContent>
                {getFieldOptions().map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis 
                type={numericFields.includes(xAxis) ? "number" : "category"} 
                dataKey="x" 
                name={xAxis} 
                label={{ value: xAxis, position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type={numericFields.includes(yAxis) ? "number" : "category"} 
                dataKey="y" 
                name={yAxis} 
                label={{ value: yAxis, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={renderCustomTooltip} />
              <Scatter name="Patients" data={processDataForChart()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
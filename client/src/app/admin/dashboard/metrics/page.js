"use client"

import { useState, useEffect, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScatterChart, Scatter, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const numericFields = ['age', 'premature_births', 'late_births', 'miscarriages', 'successful_births']
const categoricalFields = ['race', 'gender', 'ethnicity', 'primary_language', 'employment_status']
const booleanFields = ['insured', 'social_benefits', 'high_risk', 'post_pregnancy']

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function PatientDataDashboard() {
  const [patientsData, setPatientsData] = useState([])
  const [charts, setCharts] = useState([])
  const [xAxis, setXAxis] = useState('age')
  const [yAxis, setYAxis] = useState('successful_births')
  const [chartType, setChartType] = useState('scatter')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/patients`);
        const data = await response.json()
        setPatientsData(data)
      } catch (error) {
        console.error("Failed to fetch patient data:", error)
      }
    }
    fetchData()
  }, [])

  const getFieldOptions = () => {
    return [...numericFields, ...categoricalFields, ...booleanFields]
  }

  const getSuggestedChartTypes = useMemo(() => {
    const isXNumeric = numericFields.includes(xAxis)
    const isYNumeric = numericFields.includes(yAxis)
    const isXCategorical = categoricalFields.includes(xAxis) || booleanFields.includes(xAxis)
    const isYCategorical = categoricalFields.includes(yAxis) || booleanFields.includes(yAxis)

    if (isXNumeric && isYNumeric) {
      return ['scatter', 'bar']
    } else if (isXCategorical && isYNumeric) {
      return ['bar']
    } else if (isXCategorical && yAxis === 'none') {
      return ['pie']
    } else {
      return ['bar']
    }
  }, [xAxis, yAxis])

  useEffect(() => {
    if (getSuggestedChartTypes.length > 0 && !getSuggestedChartTypes.includes(chartType)) {
      setChartType(getSuggestedChartTypes[0])
    }
  }, [getSuggestedChartTypes, chartType])

  const processDataForChart = (x, y) => {
    if (y === 'none') {
      const data = patientsData.reduce((acc, patient) => {
        const key = patient[x]
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += 1
        return acc
      }, {})
      return Object.entries(data).map(([name, value]) => ({ name, value }))
    }
    return patientsData.map(patient => ({
      [x]: patient[x],
      [y]: patient[y],
    }))
  }

  const addChart = () => {
    setCharts(prevCharts => [...prevCharts, { id: Date.now(), type: chartType, x: xAxis, y: yAxis }])
  }

  const renderChart = (chart) => {
    const chartConfig = {
      [chart.x]: {
        label: chart.x,
        color: "hsl(var(--primary))",
      },
      [chart.y]: {
        label: chart.y,
        color: "hsl(var(--primary))",
      },
    }

    const data = processDataForChart(chart.x, chart.y)

    return (
      <Card key={chart.id} className="w-full mb-4">
        <CardHeader>
          <CardTitle>{`${chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart`}</CardTitle>
          <CardDescription>{`${chart.x}${chart.y !== 'none' ? ` vs ${chart.y}` : ''}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[350px]" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === 'scatter' && (
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type={numericFields.includes(chart.x) ? "number" : "category"} dataKey={chart.x} name={chart.x} />
                  <YAxis type={numericFields.includes(chart.y) ? "number" : "category"} dataKey={chart.y} name={chart.y} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Scatter name="Patients" data={data} fill="var(--color-primary)" />
                  <Legend />
                </ScatterChart>
              )}
              {chart.type === 'bar' && (
                <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={chart.x} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey={chart.y !== 'none' ? chart.y : 'value'} fill="var(--color-primary)" name={chart.y !== 'none' ? chart.y : 'Count'} />
                  <Legend />
                </BarChart>
              )}
              {chart.type === 'pie' && (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="w-full  mb-4">
        <CardHeader>
          <CardTitle>Patient Data Dashboard</CardTitle>
          <CardDescription>Create and add charts to visualize patient data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="x-axis">X Axis</Label>
              <Select onValueChange={setXAxis} value={xAxis}>
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
              <Label htmlFor="y-axis">Y Axis (Optional for Pie Chart)</Label>
              <Select onValueChange={setYAxis} value={yAxis}>
                <SelectTrigger id="y-axis">
                  <SelectValue placeholder="Select Y Axis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (for Pie Chart)</SelectItem>
                  {getFieldOptions().map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="chart-type">Chart Type</Label>
            <Select onValueChange={setChartType} value={chartType}>
              <SelectTrigger id="chart-type">
                <SelectValue placeholder="Select Chart Type" />
              </SelectTrigger>
              <SelectContent>
                {getSuggestedChartTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addChart}>Add Chart to Dashboard</Button>
        </CardContent>
      </Card>
      {charts.map(renderChart)}
    </div>
  )
}
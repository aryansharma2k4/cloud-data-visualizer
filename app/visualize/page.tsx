"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3, FileSpreadsheet, LineChartIcon, PieChartIcon, Upload, AlertCircle, Check, ChevronDown } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
} from "@/components/chart"
import Link from "next/link"

export default function VisualizePage() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeChart, setActiveChart] = useState("table")
  const [selectedCategoryField, setSelectedCategoryField] = useState<string | null>(null)
  const [selectedValueField, setSelectedValueField] = useState<string | null>(null)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [valueDropdownOpen, setValueDropdownOpen] = useState(false)

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    setFile(file)
    setError(null)

    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase()

      if (fileExtension === "json") {
        const text = await file.text()
        const jsonData = JSON.parse(text)

        if (Array.isArray(jsonData)) {
          setData(jsonData)
        } else if (typeof jsonData === "object") {
          // If it's an object with arrays inside
          const firstArrayKey = Object.keys(jsonData).find((key) => Array.isArray(jsonData[key]))
          if (firstArrayKey) {
            setData(jsonData[firstArrayKey])
          } else {
            // Convert object to array if it's not already an array
            setData([jsonData])
          }
        } else {
          throw new Error("Invalid JSON format. Expected an array or object.")
        }
      } else if (fileExtension === "csv") {
        const text = await file.text()
        const rows = text.split("\n")
        const headers = rows[0].split(",").map((header) => header.trim())

        const parsedData = rows
          .slice(1)
          .map((row) => {
            const values = row.split(",").map((value) => value.trim())
            return headers.reduce(
              (obj, header, index) => {
                obj[header] = values[index]
                return obj
              },
              {} as Record<string, string>,
            )
          })
          .filter((row) => Object.values(row).some((value) => value))

        setData(parsedData)
      } else {
        throw new Error("Unsupported file format. Please upload a JSON or CSV file.")
      }
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Failed to parse file")
      setData(null)
    }
  }

  const getChartableData = () => {
    if (!data || data.length === 0) return []

    // Get only the first 10 items for better visualization
    return data.slice(0, 10)
  }

  const getChartableFields = () => {
    if (!data || data.length === 0) return { numeric: [], categorical: [] }

    const firstItem = data[0]
    const fields = {
      numeric: [] as string[],
      categorical: [] as string[],
    }

    Object.entries(firstItem).forEach(([key, value]) => {
      if (typeof value === "number" || (!isNaN(Number(value)) && value !== "" && value !== null)) {
        fields.numeric.push(key)
      } else {
        fields.categorical.push(key)
      }
    })

    return fields
  }

  // Set default selections when data is loaded or chart type changes
  const updateDefaultSelections = () => {
    const { numeric, categorical } = getChartableFields()
    
    if (!selectedCategoryField && categorical.length > 0) {
      setSelectedCategoryField(categorical[0])
    }
    
    if (!selectedValueField && numeric.length > 0) {
      setSelectedValueField(numeric[0])
    }
  }
  console.log(data);
  

  // Update selections when data changes
  if (data && (!selectedCategoryField || !selectedValueField)) {
    updateDefaultSelections()
  }

  // Custom dropdown components since we don't have access to the UI components
  const renderFieldSelectors = () => {
    const { numeric, categorical } = getChartableFields()
    
    if (numeric.length === 0 || categorical.length === 0) {
      return null
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label htmlFor="category-field" className="text-sm font-medium">
            Category Field
          </label>
          <div className="relative">
            <button
              id="category-field"
              type="button"
              className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            >
              <span>{selectedCategoryField || "Select category field"}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            
            {categoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
                <ul className="py-1 text-sm">
                  {categorical.map((field) => (
                    <li 
                      key={field} 
                      className="relative cursor-pointer select-none py-1.5 px-2 hover:bg-accent hover:text-accent-foreground" 
                      onClick={() => {
                        setSelectedCategoryField(field)
                        setCategoryDropdownOpen(false)
                      }}
                    >
                      <div className="flex items-center">
                        {field}
                        {field === selectedCategoryField && <Check className="h-4 w-4 ml-2" />}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="value-field" className="text-sm font-medium">
            Value Field
          </label>
          <div className="relative">
            <button
              id="value-field"
              type="button"
              className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              onClick={() => setValueDropdownOpen(!valueDropdownOpen)}
            >
              <span>{selectedValueField || "Select value field"}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            
            {valueDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
                <ul className="py-1 text-sm">
                  {numeric.map((field) => (
                    <li 
                      key={field} 
                      className="relative cursor-pointer select-none py-1.5 px-2 hover:bg-accent hover:text-accent-foreground" 
                      onClick={() => {
                        setSelectedValueField(field)
                        setValueDropdownOpen(false)
                      }}
                    >
                      <div className="flex items-center">
                        {field}
                        {field === selectedValueField && <Check className="h-4 w-4 ml-2" />}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Replace renderBarChart with this:
// Updated bar chart renderer
// Fixed Bar Chart Renderer
const renderBarChart = () => {
  const chartData = getChartableData();
  const { numeric, categorical } = getChartableFields();
  
  if (numeric.length === 0 || categorical.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Cannot create bar chart. Need at least one numeric and one categorical field.
        </p>
      </div>
    );
  }

  if (!selectedCategoryField || !selectedValueField) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Please select category and value fields for the chart.
        </p>
      </div>
    );
  }

  // Ensure numeric values and prepare data in Chart.js format
  const labels = chartData.map(item => String(item[selectedCategoryField]));
  const values = chartData.map(item => Number(item[selectedValueField]) || 0);
  
  const formattedData = {
    labels: labels,
    datasets: [
      {
        label: selectedValueField,
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="h-[300px] w-full">
      <Chart
        data={formattedData}
        chartType="bar"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              title: { display: true, text: selectedCategoryField },
            },
            y: {
              title: { display: true, text: selectedValueField },
              beginAtZero: true
            },
          },
        }}
      />
    </div>
  );
};

// Fixed Line Chart Renderer
const renderLineChart = () => {
  const chartData = getChartableData();
  const { numeric, categorical } = getChartableFields();
  
  if (numeric.length === 0 || categorical.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Cannot create line chart. Need at least one numeric and one categorical field.
        </p>
      </div>
    );
  }

  if (!selectedCategoryField || !selectedValueField) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Please select category and value fields for the chart.
        </p>
      </div>
    );
  }

  // Ensure numeric values and prepare data in Chart.js format
  const labels = chartData.map(item => String(item[selectedCategoryField]));
  const values = chartData.map(item => Number(item[selectedValueField]) || 0);
  
  const formattedData = {
    labels: labels,
    datasets: [
      {
        label: selectedValueField,
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="h-[300px] w-full">
      <Chart
        data={formattedData}
        chartType="line"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              title: { display: true, text: selectedCategoryField },
            },
            y: {
              title: { display: true, text: selectedValueField },
              beginAtZero: true
            },
          },
        }}
      />
    </div>
  );
};

// Fixed Pie Chart Renderer
const renderPieChart = () => {
  const chartData = getChartableData();
  const { numeric, categorical } = getChartableFields();
  
  if (numeric.length === 0 || categorical.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Cannot create pie chart. Need at least one numeric and one categorical field.
        </p>
      </div>
    );
  }

  if (!selectedCategoryField || !selectedValueField) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Please select category and value fields for the chart.
        </p>
      </div>
    );
  }

  // Generate colorful background array for pie segments
  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
    '#FF9F40', '#7BC8A4', '#E7E9ED', '#8A2BE2', '#20B2AA'
  ];
  
  // Transform data for pie chart in Chart.js format
  const labels = chartData.map(item => String(item[selectedCategoryField]));
  const values = chartData.map(item => Number(item[selectedValueField]) || 0);
  
  const pieData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.slice(0, labels.length),
        hoverBackgroundColor: backgroundColors.slice(0, labels.length)
      }
    ]
  };

  return (
    <div className="h-[300px] w-full">
      <Chart
        data={pieData}
        chartType="pie"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              position: 'right'
            },
            tooltip: { enabled: true },
          }
        }}
      />
    </div>
  );
};
  const renderTable = () => {
    if (!data || data.length === 0) return null

    const headers = Object.keys(data[0])

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 100).map((row, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={`${index}-${header}`}>{String(row[header])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Data Visualization</h1>

      {!data ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Your Data</CardTitle>
            <CardDescription>Drop a JSON or CSV file to visualize your data with tables and charts</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Drag and drop your file here</h3>
                <p className="text-sm text-muted-foreground mb-4">or click to browse your files</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Select JSON or CSV file
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".json,.csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{file?.name}</h2>
              <p className="text-sm text-muted-foreground">{data.length} records found</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setFile(null)
                setData(null)
                setError(null)
                setSelectedCategoryField(null)
                setSelectedValueField(null)
              }}
            >
              Upload a different file
            </Button>
            <Link href= "/chat"><Button>Visualize the data with the help of AI</Button></Link>
          </div>

          <Tabs defaultValue="table" value={activeChart} onValueChange={setActiveChart}>
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="table">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Table
              </TabsTrigger>
              <TabsTrigger value="bar">
                <BarChart3 className="mr-2 h-4 w-4" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="line">
                <LineChartIcon className="mr-2 h-4 w-4" />
                Line
              </TabsTrigger>
              <TabsTrigger value="pie">
                <PieChartIcon className="mr-2 h-4 w-4" />
                Pie
              </TabsTrigger>
            </TabsList>

            <Card className="mt-4">
              <CardContent className="pt-6">
                {activeChart !== "table" && renderFieldSelectors()}
                
                <TabsContent value="table" className="mt-0">
                  {renderTable()}
                </TabsContent>
                <TabsContent value="bar" className="mt-0">
                  {renderBarChart()}
                </TabsContent>
                <TabsContent value="line" className="mt-0">
                  {renderLineChart()}
                </TabsContent>
                <TabsContent value="pie" className="mt-0">
                  {renderPieChart()}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      )}
    </div>
  )
}
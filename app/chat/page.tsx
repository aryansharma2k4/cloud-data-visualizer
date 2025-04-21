"use client"

import type React from "react"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { useEffect, useState } from "react"
import { Upload, FileUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatPage() {
  const [data, setData] = useState<string | null>(null)
  const [responseText, setResponseText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileRead = (file: File) => {
    setIsLoading(true)
    const reader = new FileReader()

    reader.onload = (event) => {
        if (event.target?.result) {
            let fileContent = event.target.result as string;
            setData(fileContent.slice(0, 50000)); // Read only first 50,000 characters
        }
    }

    reader.readAsText(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files

    if (files.length > 0) {
      handleFileRead(files[0])
    }
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleFileRead(files[0])
    }
  }

  // Fetch Gemini API response when data changes
  useEffect(() => {
    async function fetchGeminiResponse() {
      if (!data) return

      try {
        const GEMINI_API_KEY = "AIzaSyDE2l15GkefPfBBXDZVfZcl5RJHLczMtRY"

        // Initialize GoogleGenerativeAI
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        // Constructing a dynamic prompt using data
        const prompt = `Help me visualize this data by explaining key details about it:\n${data}`

        // Generate content
        const result = await model.generateContent(prompt)
        const response = await result.response.text()

        setResponseText(response)
      } catch (error) {
        console.error("Error fetching from Gemini API:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (data) {
      fetchGeminiResponse()
    }
  }, [data])

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Data Analyzer</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Drag & drop your file here</h3>
                <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
                <input id="file-input" type="file" className="hidden" onChange={handleFileInput} />
                {data && !isLoading && (
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <FileUp className="h-4 w-4 mr-1" />
                    File uploaded successfully
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {(isLoading || responseText) && (
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[85%]" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
              ) : (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{responseText || ""}</ReactMarkdown>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


import type React from "react"
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-10">{children}</main>
}


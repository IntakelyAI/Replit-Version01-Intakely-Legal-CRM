"use client"

import type React from "react"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNavigation } from "@/components/main-navigation"
import { LawFirmNavigation } from "@/components/law-firm-navigation"
import { TopBar } from "@/components/top-bar"

import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [selectedLawFirm, setSelectedLawFirm] = useState<string | null>(null)

  const handleSelectLawFirm = (firmName: string) => {
    setSelectedLawFirm(firmName)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex h-screen overflow-hidden">
            <MainNavigation onSelectLawFirm={handleSelectLawFirm} />
            {selectedLawFirm && <LawFirmNavigation firmName={selectedLawFirm} />}
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

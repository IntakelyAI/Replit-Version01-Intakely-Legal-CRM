"use client"

import type React from "react"

import { SidebarTrigger } from "@/components/ui/sidebar"

export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1" />
      </header>
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  )
}

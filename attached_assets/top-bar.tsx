"use client"

import { Search, Bell, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 flex items-center justify-between">
      <div className="hidden md:flex items-center gap-2 max-w-md w-full">
        <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
        <Input placeholder="Search..." className="pl-9 bg-background/60 border-border focus-visible:ring-purple-500" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-purple-600">
            3
          </Badge>
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

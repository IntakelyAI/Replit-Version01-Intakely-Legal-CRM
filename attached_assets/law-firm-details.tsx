"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function LawFirmDetailsView() {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-purple-300">Law Firm Details</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Basic Details</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card className="bg-background/60 backdrop-blur">
            <CardHeader>
              <CardTitle>Firm Information</CardTitle>
              <CardDescription>Basic information about your law firm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firmName">Law Firm Name</Label>
                  <Input id="firmName" placeholder="Enter firm name" defaultValue="Oakwood Law Firm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input id="establishedYear" placeholder="YYYY" defaultValue="2010" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your firm"
                    className="min-h-[100px]"
                    defaultValue="Oakwood Law Firm specializes in corporate law, intellectual property, and litigation services."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card className="bg-background/60 backdrop-blur">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How clients can reach your firm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="contact@example.com" defaultValue="info@oakwoodlaw.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" defaultValue="https://oakwoodlaw.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State, ZIP"
                    defaultValue="123 Oakwood Ave, San Francisco, CA 94107"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="space-y-4">
          <Card className="bg-background/60 backdrop-blur">
            <CardHeader>
              <CardTitle>Registration Information</CardTitle>
              <CardDescription>Legal registration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ein">EIN/Registration Number</Label>
                  <Input id="ein" placeholder="XX-XXXXXXX" defaultValue="12-3456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barAssociation">Bar Association</Label>
                  <Input
                    id="barAssociation"
                    placeholder="State Bar Association"
                    defaultValue="California State Bar Association"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input id="licenseNumber" placeholder="License Number" defaultValue="CAL-12345-LF" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input id="taxId" placeholder="Tax ID" defaultValue="987-65-4321" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

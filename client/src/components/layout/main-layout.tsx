import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import MobileNav from "./mobile-nav";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <Header />
        
        <main className="container mx-auto px-4 py-6 sm:px-6 md:py-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
}

// Main dashboard layout component that wraps all dashboard pages
// Provides the sidebar navigation and main content area
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <main className="flex-1 md:ml-[70px] lg:ml-[280px] overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
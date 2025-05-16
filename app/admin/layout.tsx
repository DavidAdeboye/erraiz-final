import type React from "react"
import { requireRole } from "@/lib/auth"
import Link from "next/link"
import {
  BarChart3,
  Box,
  CreditCard,
  DollarSign,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // This will redirect if not authenticated as an admin
  const user = requireRole("admin")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-600 text-white">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="font-semibold">Cireco Admin</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/users">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/products">
                    <Box className="h-4 w-4" />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/orders">
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/categories">
                    <Tag className="h-4 w-4" />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/payments">
                    <CreditCard className="h-4 w-4" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/commissions">
                    <DollarSign className="h-4 w-4" />
                    <span>Commissions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              <div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="border-b">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="text-xl font-semibold">Admin Panel</div>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                  <Home className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

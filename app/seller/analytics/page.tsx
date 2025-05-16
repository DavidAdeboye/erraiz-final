import { requireRole } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter } from "lucide-react"
import SalesOverview from "@/components/sales-overview"
import ProductPerformance from "@/components/product-performance"
import CustomerInsights from "@/components/customer-insights"
import OrderAnalytics from "@/components/order-analytics"
import FinancialMetrics from "@/components/financial-metrics"
import MarketingPerformance from "@/components/marketing-performance"
import DateRangePicker from "@/components/date-range-picker"

export default function SellerAnalyticsPage() {
  // This will redirect if not authenticated as a seller
  requireRole("seller")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Track your store's performance and growth</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <DateRangePicker />
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Sales</div>
          <div className="text-2xl font-bold mt-1">$12,845.50</div>
          <div className="text-xs text-green-600 mt-1">↑ 12.5% from last month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold mt-1">248</div>
          <div className="text-xs text-green-600 mt-1">↑ 8.2% from last month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Conversion Rate</div>
          <div className="text-2xl font-bold mt-1">3.2%</div>
          <div className="text-xs text-red-600 mt-1">↓ 0.5% from last month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg. Order Value</div>
          <div className="text-2xl font-bold mt-1">$51.80</div>
          <div className="text-xs text-green-600 mt-1">↑ 4.3% from last month</div>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <SalesOverview />
        </TabsContent>

        <TabsContent value="products">
          <ProductPerformance />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerInsights />
        </TabsContent>

        <TabsContent value="orders">
          <OrderAnalytics />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialMetrics />
        </TabsContent>

        <TabsContent value="marketing">
          <MarketingPerformance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

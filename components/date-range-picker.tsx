"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function DateRangePicker() {
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  const [isOpen, setIsOpen] = useState(false)

  const predefinedRanges = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
    { label: "Year to date", days: "ytd" },
  ]

  const handleRangeSelect = (days: number | string) => {
    const to = new Date()
    let from: Date

    if (days === "ytd") {
      from = new Date(new Date().getFullYear(), 0, 1) // January 1st of current year
    } else {
      from = new Date(new Date().setDate(new Date().getDate() - (days as number)))
    }

    setDateRange({ from, to })
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 border-b">
          <div className="text-sm font-medium mb-2">Select Range</div>
          <div className="flex flex-wrap gap-2">
            {predefinedRanges.map((range) => (
              <Button
                key={range.label}
                variant="outline"
                size="sm"
                onClick={() => handleRangeSelect(range.days)}
                className="text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <div>
            <div className="text-sm font-medium mb-2">From</div>
            <CalendarComponent
              mode="single"
              selected={dateRange.from}
              onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
              disabled={(date) => date > new Date() || date > dateRange.to}
              initialFocus
            />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">To</div>
            <CalendarComponent
              mode="single"
              selected={dateRange.to}
              onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
              disabled={(date) => date > new Date() || date < dateRange.from}
              initialFocus
            />
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <Button size="sm" onClick={() => setIsOpen(false)}>
            Apply Range
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

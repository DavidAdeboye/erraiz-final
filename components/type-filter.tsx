"use client"

interface TypeFilterProps {
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function TypeFilter({ selected, onChange }: TypeFilterProps) {
  const types = [
    { id: "chair", name: "Chair", count: 120 },
    { id: "table", name: "Table", count: 85 },
    { id: "stool", name: "Stool", count: 64 },
    { id: "bench", name: "Bench", count: 42 },
    { id: "shelf", name: "Shelf", count: 38 },
  ]

  const toggleType = (typeId: string) => {
    if (selected.includes(typeId)) {
      onChange(selected.filter((id) => id !== typeId))
    } else {
      onChange([...selected, typeId])
    }
  }

  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Product type</h3>

      <div className="space-y-2">
        {types.map((type) => (
          <div key={type.id} className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                checked={selected.includes(type.id)}
                onChange={() => toggleType(type.id)}
              />
              <span className="ml-2 text-sm text-gray-700">{type.name}</span>
            </label>
            <span className="text-xs text-gray-500">{type.count} items</span>
          </div>
        ))}
      </div>
    </div>
  )
}

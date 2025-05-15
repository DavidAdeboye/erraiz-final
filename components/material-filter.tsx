"use client"

interface MaterialFilterProps {
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function MaterialFilter({ selected, onChange }: MaterialFilterProps) {
  const materials = [
    { id: "plastic", name: "Plastic", count: 1290 },
    { id: "glass", name: "Glass", count: 1290 },
    { id: "nylon", name: "Nylon", count: 1290 },
    { id: "others", name: "Others", count: 1290 },
  ]

  const toggleMaterial = (materialId: string) => {
    if (selected.includes(materialId)) {
      onChange(selected.filter((id) => id !== materialId))
    } else {
      onChange([...selected, materialId])
    }
  }

  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Material type</h3>

      <div className="space-y-2">
        {materials.map((material) => (
          <div key={material.id} className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                checked={selected.includes(material.id)}
                onChange={() => toggleMaterial(material.id)}
              />
              <span className="ml-2 text-sm text-gray-700">{material.name}</span>
            </label>
            <span className="text-xs text-gray-500">{material.count} items</span>
          </div>
        ))}
      </div>
    </div>
  )
}

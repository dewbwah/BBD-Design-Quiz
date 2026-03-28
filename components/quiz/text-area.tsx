"use client"

import { cn } from "@/lib/utils"

interface TextAreaProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  rows?: number
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-charcoal"
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full resize-none rounded-md border-2 border-border bg-card px-4 py-3 text-charcoal placeholder:text-soft-gray",
          "transition-all duration-200",
          "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        )}
      />
    </div>
  )
}

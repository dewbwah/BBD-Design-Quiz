"use client"

import { cn } from "@/lib/utils"

interface TextInputProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "email" | "tel"
  required?: boolean
  placeholder?: string
  autoComplete?: string
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-charcoal"
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-md border-2 border-border bg-card px-4 py-3 text-charcoal placeholder:text-soft-gray",
          "transition-all duration-200",
          "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        )}
      />
    </div>
  )
}

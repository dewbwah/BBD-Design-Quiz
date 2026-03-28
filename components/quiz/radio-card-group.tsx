"use client"

import { cn } from "@/lib/utils"

interface RadioCardOption {
  value: string
  label: string
}

interface RadioCardGroupProps {
  name: string
  options: RadioCardOption[]
  value: string
  onChange: (value: string) => void
  columns?: 2 | 3
}

export function RadioCardGroup({
  name,
  options,
  value,
  onChange,
  columns = 2,
}: RadioCardGroupProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}
      role="radiogroup"
      aria-label={name}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "relative flex cursor-pointer items-center justify-center rounded-md border-2 bg-card px-6 py-5 text-center transition-all duration-200",
            "hover:border-gold/50 hover:shadow-sm",
            "focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-background",
            value === option.value
              ? "border-gold bg-gold/5 shadow-sm"
              : "border-border"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <span className="text-base font-medium text-charcoal">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}

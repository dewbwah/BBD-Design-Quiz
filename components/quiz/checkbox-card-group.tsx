"use client"

import { cn } from "@/lib/utils"

interface CheckboxCardOption {
  value: string
  label: string
}

interface CheckboxCardGroupProps {
  name: string
  options: CheckboxCardOption[]
  values: string[]
  onChange: (values: string[]) => void
  columns?: 2 | 3
}

export function CheckboxCardGroup({
  name,
  options,
  values,
  onChange,
  columns = 2,
}: CheckboxCardGroupProps) {
  const handleToggle = (optionValue: string) => {
    if (values.includes(optionValue)) {
      onChange(values.filter((v) => v !== optionValue))
    } else {
      onChange([...values, optionValue])
    }
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}
      role="group"
      aria-label={name}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "relative flex cursor-pointer items-center justify-center rounded-md border-2 bg-card px-6 py-5 text-center transition-all duration-200",
            "hover:border-gold/50 hover:shadow-sm",
            "focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-background",
            values.includes(option.value)
              ? "border-gold bg-gold/5 shadow-sm"
              : "border-border"
          )}
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={() => handleToggle(option.value)}
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

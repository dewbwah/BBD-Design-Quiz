"use client"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface SubmitButtonProps {
  isLoading?: boolean
  disabled?: boolean
}

export function SubmitButton({ isLoading = false, disabled = false }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={cn(
        "w-full rounded-md bg-charcoal px-8 py-4 text-base font-medium text-cream",
        "transition-all duration-200",
        "hover:bg-charcoal/90 hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "flex items-center justify-center gap-3"
      )}
    >
      {isLoading ? (
        <>
          <Spinner className="h-5 w-5" />
          <span>Submitting...</span>
        </>
      ) : (
        "Submit Your Design Quiz"
      )}
    </button>
  )
}

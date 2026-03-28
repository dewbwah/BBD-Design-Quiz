"use client"

export function SuccessState() {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
        <svg
          className="h-10 w-10 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="mb-4 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
        Thank you for sharing your vision.
      </h2>
      <p className="mx-auto max-w-md text-lg leading-relaxed text-soft-gray">
        {"We've received your responses and will review everything before your consultation. This allows us to come prepared with direction, ideas, and clarity."}
      </p>
    </div>
  )
}

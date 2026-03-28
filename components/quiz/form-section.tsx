interface FormSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, children, className = "" }: FormSectionProps) {
  return (
    <section className={`py-10 ${className}`}>
      <div className="mb-8">
        <h3 className="font-serif text-xl text-charcoal mb-1">{title}</h3>
        <div className="w-12 h-px bg-gold" />
      </div>
      <div className="flex flex-col gap-8">
        {children}
      </div>
    </section>
  )
}

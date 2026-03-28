import { StickyInspirationGallery } from "@/components/quiz/sticky-inspiration-gallery"
import { QuizForm } from "@/components/quiz/quiz-form"

export default function DesignQuizPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header / Intro */}
      <header className="border-b border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="font-serif text-4xl text-charcoal md:text-5xl lg:text-6xl">
            Design Quiz
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-soft-gray">
            Help us understand your vision so we can design your space with precision and intention.
          </p>
          <p className="mt-3 text-sm text-soft-gray/80">
            Takes about 3-5 minutes
          </p>
        </div>
      </header>

      {/* Main Content: 2-column layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Sticky Inspiration Gallery */}
          <aside className="lg:col-span-5">
            <StickyInspirationGallery />
          </aside>

          {/* Right Column: Quiz Form */}
          <div className="mt-12 lg:col-span-7 lg:mt-0">
            <QuizForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-charcoal px-6 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-serif text-lg text-cream">Built By Design</p>
          <p className="mt-2 text-sm text-cream/60">
            Architectural remodeling in Kansas City
          </p>
        </div>
      </footer>
    </main>
  )
}

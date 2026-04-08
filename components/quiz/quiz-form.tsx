"use client"

import { useState } from "react"
import { FormSection } from "./form-section"
import { RadioCardGroup } from "./radio-card-group"
import { CheckboxCardGroup } from "./checkbox-card-group"
import { TextInput } from "./text-input"
import { TextArea } from "./text-area"
import { SubmitButton } from "./submit-button"
import { SuccessState } from "./success-state"

interface FormData {
  // Contact
  fullName: string
  email: string
  phone: string
  projectAddress: string
  // Project Overview
  space: string
  projectScope: string
  // Goals
  mainGoal: string
  secondaryPriorities: string[]
  // Style
  designStyle: string
  inspiration: string
  // Colors & Materials
  colorPalette: string
  materialDirection: string
  // Features
  mustHaveFeatures: string[]
  currentFrustrations: string
  // Lifestyle
  dailyUse: string
  stayDuration: string
  // Timeline & Investment
  startTimeline: string
  investmentLevel: string
  // Final
  additionalNotes: string
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  projectAddress: "",
  space: "",
  projectScope: "",
  mainGoal: "",
  secondaryPriorities: [],
  designStyle: "",
  inspiration: "",
  colorPalette: "",
  materialDirection: "",
  mustHaveFeatures: [],
  currentFrustrations: "",
  dailyUse: "",
  stayDuration: "",
  startTimeline: "",
  investmentLevel: "",
  additionalNotes: "",
}

export function QuizForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [website, setWebsite] = useState("")
  const [loadedAt] = useState(() => Date.now())

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!e.currentTarget.reportValidity()) {
      return
    }

    // Honeypot trap for basic bots
    if (website.trim()) {
      setIsSubmitted(true)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    let timeout: ReturnType<typeof setTimeout> | undefined
    try {
      const controller = new AbortController()
      timeout = setTimeout(() => controller.abort(), 10000)
      const submittedAt = Date.now()

      const response = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _gotcha: website,
          _timeToSubmitMs: submittedAt - loadedAt,
        }),
        signal: controller.signal,
      })

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!response.ok) {
        throw new Error(result?.error || `Submission failed with status ${response.status}`)
      }

      if (!result?.ok) {
        throw new Error("Submission was not accepted.")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Form submission failed:", error)
      if (error instanceof Error) {
        setSubmitError(error.message)
      } else {
        setSubmitError("We couldn't submit your quiz right now. Please try again.")
      }
    } finally {
      if (timeout) {
        clearTimeout(timeout)
      }
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return <SuccessState />
  }

  return (
    <form onSubmit={handleSubmit} className="pb-16" noValidate>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="sr-only"
        aria-hidden="true"
      />
      {/* Section 1: Contact Information */}
      <fieldset disabled={isSubmitting} className="contents">
        <FormSection title="Contact Information">
        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={(v) => updateField("fullName", v)}
            autoComplete="name"
            required
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(v) => updateField("email", v)}
            autoComplete="email"
            required
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(v) => updateField("phone", v)}
            autoComplete="tel"
            placeholder="Optional"
          />
          <TextInput
            label="Project Address"
            name="projectAddress"
            value={formData.projectAddress}
            onChange={(v) => updateField("projectAddress", v)}
            autoComplete="street-address"
            placeholder="Optional"
          />
        </div>
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 2: Project Overview */}
        <FormSection title="Project Overview">
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Which space are you planning to remodel?
          </p>
          <RadioCardGroup
            name="space"
            value={formData.space}
            onChange={(v) => updateField("space", v)}
            columns={3}
            options={[
              { value: "kitchen", label: "Kitchen" },
              { value: "bathroom", label: "Bathroom" },
              { value: "basement", label: "Basement" },
              { value: "whole-home", label: "Whole Home" },
              { value: "addition", label: "Addition" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            How extensive is your project?
          </p>
          <RadioCardGroup
            name="projectScope"
            value={formData.projectScope}
            onChange={(v) => updateField("projectScope", v)}
            options={[
              { value: "cosmetic", label: "Cosmetic refresh" },
              { value: "moderate", label: "Moderate remodel" },
              { value: "full", label: "Full renovation" },
              { value: "unsure", label: "Not sure yet" },
            ]}
          />
        </div>
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 3: Goals */}
        <FormSection title="Goals">
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            What&apos;s your main goal?
          </p>
          <RadioCardGroup
            name="mainGoal"
            value={formData.mainGoal}
            onChange={(v) => updateField("mainGoal", v)}
            columns={3}
            options={[
              { value: "functionality", label: "Improve functionality" },
              { value: "design", label: "Upgrade design" },
              { value: "value", label: "Increase home value" },
              { value: "entertaining", label: "Create entertaining space" },
              { value: "add-space", label: "Add space" },
            ]}
          />
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Secondary priorities <span className="text-soft-gray font-normal">(select all that apply)</span>
          </p>
          <CheckboxCardGroup
            name="secondaryPriorities"
            values={formData.secondaryPriorities}
            onChange={(v) => updateField("secondaryPriorities", v)}
            options={[
              { value: "storage", label: "Storage" },
              { value: "flow", label: "Flow/layout" },
              { value: "efficiency", label: "Energy efficiency" },
              { value: "luxury", label: "Luxury finishes" },
            ]}
          />
        </div>
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 4: Style */}
        <FormSection title="Style">
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Which style feels closest to you?
          </p>
          <RadioCardGroup
            name="designStyle"
            value={formData.designStyle}
            onChange={(v) => updateField("designStyle", v)}
            columns={3}
            options={[
              { value: "modern", label: "Modern" },
              { value: "transitional", label: "Transitional" },
              { value: "traditional", label: "Traditional" },
              { value: "scandinavian", label: "Scandinavian" },
              { value: "industrial", label: "Industrial" },
              { value: "midcentury", label: "Mid-century" },
              { value: "eclectic", label: "Eclectic" },
            ]}
          />
        </div>
        <TextArea
          label="Describe any inspiration, Pinterest ideas, or spaces you love"
          name="inspiration"
          value={formData.inspiration}
          onChange={(v) => updateField("inspiration", v)}
          placeholder="Share links, describe images, or tell us about spaces that inspire you..."
          rows={4}
        />
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 5: Colors & Materials */}
        <FormSection title="Colors & Materials">
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Preferred palette
          </p>
          <RadioCardGroup
            name="colorPalette"
            value={formData.colorPalette}
            onChange={(v) => updateField("colorPalette", v)}
            columns={3}
            options={[
              { value: "warm-neutrals", label: "Warm neutrals" },
              { value: "cool-neutrals", label: "Cool neutrals" },
              { value: "earth-tones", label: "Earth tones" },
              { value: "bold-dark", label: "Bold/dark" },
              { value: "light-airy", label: "Light/airy" },
            ]}
          />
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Material direction
          </p>
          <RadioCardGroup
            name="materialDirection"
            value={formData.materialDirection}
            onChange={(v) => updateField("materialDirection", v)}
            options={[
              { value: "natural", label: "Natural wood & stone" },
              { value: "clean", label: "Clean & polished" },
              { value: "matte", label: "Matte/minimal" },
              { value: "rustic", label: "Rustic/texture-heavy" },
            ]}
          />
        </div>
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 6: Features */}
        <FormSection title="Features">
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Must-have features <span className="text-soft-gray font-normal">(select all that apply)</span>
          </p>
          <CheckboxCardGroup
            name="mustHaveFeatures"
            values={formData.mustHaveFeatures}
            onChange={(v) => updateField("mustHaveFeatures", v)}
            columns={3}
            options={[
              { value: "open-concept", label: "Open concept" },
              { value: "custom-cabinetry", label: "Custom cabinetry" },
              { value: "spa-bathroom", label: "Spa bathroom" },
              { value: "smart-home", label: "Smart home" },
              { value: "entertainment", label: "Entertainment space" },
              { value: "indoor-outdoor", label: "Indoor-outdoor flow" },
            ]}
          />
        </div>
        <TextArea
          label="What's currently frustrating about your space?"
          name="currentFrustrations"
          value={formData.currentFrustrations}
          onChange={(v) => updateField("currentFrustrations", v)}
          placeholder="Tell us what isn't working..."
          rows={4}
        />
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 7: Lifestyle */}
        <FormSection title="Lifestyle">
        <TextArea
          label="Describe how you use this space daily"
          name="dailyUse"
          value={formData.dailyUse}
          onChange={(v) => updateField("dailyUse", v)}
          placeholder="Morning routines, entertaining, family time..."
          rows={4}
          required
        />
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            How long are you planning to stay in this home?
          </p>
          <RadioCardGroup
            name="stayDuration"
            value={formData.stayDuration}
            onChange={(v) => updateField("stayDuration", v)}
            options={[
              { value: "1-5-years", label: "1-5 years" },
              { value: "5-10-years", label: "5-10 years" },
              { value: "unsure", label: "Unsure" },
              { value: "long-term", label: "Long-term" },
            ]}
          />
        </div>
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 8: Timeline & Investment */}
        <FormSection title="Timeline & Investment">
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            When do you want to start?
          </p>
          <RadioCardGroup
            name="startTimeline"
            value={formData.startTimeline}
            onChange={(v) => updateField("startTimeline", v)}
            options={[
              { value: "asap", label: "ASAP" },
              { value: "3-6-months", label: "3-6 months" },
              { value: "6-12-months", label: "6-12 months" },
              { value: "12-plus", label: "12+ months" },
            ]}
          />
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-charcoal">
            Investment level
          </p>
          <RadioCardGroup
            name="investmentLevel"
            value={formData.investmentLevel}
            onChange={(v) => updateField("investmentLevel", v)}
            options={[
              { value: "moderate", label: "Moderate" },
              { value: "significant", label: "Significant" },
              { value: "high-end", label: "High-end" },
              { value: "flexible", label: "Flexible" },
            ]}
          />
        </div>
        </FormSection>

        <div className="border-t border-border" />

        {/* Section 9: Final Details */}
        <FormSection title="Final Details">
        <TextArea
          label="Is there anything else you want the design team to know before your consultation?"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={(v) => updateField("additionalNotes", v)}
          placeholder="Any additional details, concerns, or dreams for your space..."
          rows={5}
        />
        </FormSection>

        <div className="mt-8">
          <SubmitButton isLoading={isSubmitting} />
        </div>
      </fieldset>
      {submitError ? (
        <p className="mt-4 text-sm text-red-600" role="alert" aria-live="assertive">
          {submitError}
        </p>
      ) : null}
    </form>
  )
}

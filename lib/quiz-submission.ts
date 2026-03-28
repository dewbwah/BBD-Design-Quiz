import { z } from "zod"

const optionalText = (max: number) => z.string().trim().max(max).default("")

const spaceValues = ["kitchen", "bathroom", "basement", "whole-home", "addition", "other"] as const
const projectScopeValues = ["cosmetic", "moderate", "full", "unsure"] as const
const mainGoalValues = ["functionality", "design", "value", "entertaining", "add-space"] as const
const designStyleValues = [
  "modern",
  "transitional",
  "traditional",
  "scandinavian",
  "industrial",
  "midcentury",
  "eclectic",
] as const
const colorPaletteValues = ["warm-neutrals", "cool-neutrals", "earth-tones", "bold-dark", "light-airy"] as const
const materialDirectionValues = ["natural", "clean", "matte", "rustic"] as const
const stayDurationValues = ["long-term", "5-10-years", "unsure", "investment"] as const
const startTimelineValues = ["asap", "3-6-months", "6-12-months", "12-plus"] as const
const investmentLevelValues = ["moderate", "significant", "high-end", "flexible"] as const

const secondaryPriorityValues = ["storage", "flow", "efficiency", "luxury"] as const
const mustHaveFeatureValues = [
  "open-concept",
  "custom-cabinetry",
  "spa-bathroom",
  "smart-home",
  "entertainment",
  "indoor-outdoor",
] as const

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.literal(""), z.enum(values)]).default("")

export const quizSubmissionSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(254),
  phone: optionalText(40),
  projectAddress: optionalText(200),
  space: optionalEnum(spaceValues),
  projectScope: optionalEnum(projectScopeValues),
  mainGoal: optionalEnum(mainGoalValues),
  secondaryPriorities: z.array(z.enum(secondaryPriorityValues)).max(secondaryPriorityValues.length).default([]),
  designStyle: optionalEnum(designStyleValues),
  inspiration: optionalText(3000),
  colorPalette: optionalEnum(colorPaletteValues),
  materialDirection: optionalEnum(materialDirectionValues),
  mustHaveFeatures: z.array(z.enum(mustHaveFeatureValues)).max(mustHaveFeatureValues.length).default([]),
  currentFrustrations: optionalText(3000),
  dailyUse: z.string().trim().min(1, "Daily use is required").max(3000),
  stayDuration: optionalEnum(stayDurationValues),
  startTimeline: optionalEnum(startTimelineValues),
  investmentLevel: optionalEnum(investmentLevelValues),
  additionalNotes: optionalText(3000),
})

export type QuizSubmission = z.infer<typeof quizSubmissionSchema>

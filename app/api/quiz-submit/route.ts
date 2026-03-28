import { NextResponse } from "next/server"

import { quizSubmissionSchema } from "@/lib/quiz-submission"

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mjgpggzd"
const MAX_CONTENT_LENGTH_BYTES = 50_000
const MIN_SUBMIT_TIME_MS = 1200

const methodNotAllowed = () =>
  NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 })

export const runtime = "nodejs"

export async function GET() {
  return methodNotAllowed()
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0")
  if (Number.isFinite(contentLength) && contentLength > MAX_CONTENT_LENGTH_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 })
  }

  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported content type" }, { status: 415 })
  }

  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  if (origin && host) {
    try {
      const originHost = new URL(origin).host
      if (originHost !== host) {
        return NextResponse.json({ ok: false, error: "Invalid origin" }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid origin" }, { status: 403 })
    }
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }

  const payload = rawBody as Record<string, unknown>
  const honeypot = typeof payload._gotcha === "string" ? payload._gotcha.trim() : ""
  if (honeypot) {
    // Quietly accept bot-like submissions.
    return NextResponse.json({ ok: true })
  }

  const timeToSubmitMs = typeof payload._timeToSubmitMs === "number" ? payload._timeToSubmitMs : 0
  if (Number.isFinite(timeToSubmitMs) && timeToSubmitMs > 0 && timeToSubmitMs < MIN_SUBMIT_TIME_MS) {
    return NextResponse.json({ ok: true })
  }

  const parsed = quizSubmissionSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please complete required fields and try again.",
      },
      { status: 400 },
    )
  }

  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    const controller = new AbortController()
    timeout = setTimeout(() => controller.abort(), 10_000)

    const upstreamResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...parsed.data,
        _subject: "New Design Quiz Submission",
        _submittedVia: "design-quiz-site",
      }),
      signal: controller.signal,
    })

    if (!upstreamResponse.ok) {
      return NextResponse.json({ ok: false, error: "Unable to submit right now. Please try again." }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Request timed out. Please try again." }, { status: 504 })
  } finally {
    if (timeout) {
      clearTimeout(timeout)
    }
  }
}

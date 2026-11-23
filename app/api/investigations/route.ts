import { NextResponse } from "next/server";

export const runtime = "nodejs";

// This endpoint validates an investigation request only.
// It does not call an AI provider, write to a database, or save uploaded files.
const MAX_BODY_BYTES = 16 * 1024;
const MAX_DESCRIPTION_LENGTH = 5_000;

const ALLOWED_CATEGORIES = new Set([
  "romance",
  "impersonation",
  "marketplace",
  "job",
  "phishing",
  "investment",
  "other",
]);

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonError("Content-Type must be application/json.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonError("Request is too large.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError("Unable to read request body.", 400);
  }

  const actualLength = new TextEncoder().encode(rawBody).byteLength;
  if (actualLength > MAX_BODY_BYTES) {
    return jsonError("Request is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return jsonError("Request body must be a JSON object.", 400);
  }

  const data = body as Record<string, unknown>;
  const category = data.category;
  const description = data.description;

  if (typeof category !== "string" || !ALLOWED_CATEGORIES.has(category)) {
    return jsonError("Choose a valid investigation category.", 400);
  }

  if (
    typeof description !== "string" ||
    description.trim().length === 0 ||
    description.length > MAX_DESCRIPTION_LENGTH
  ) {
    return jsonError(
      "Description is required and must be 5,000 characters or fewer.",
      400
    );
  }

  // Deliberately do not log, persist, or return the submitted description.
  return NextResponse.json(
    {
      ok: true,
      status: "validated",
      message: "The investigation details passed basic server-side validation.",
      nextStep: "AI analysis is not connected yet.",
    },
    { status: 202 }
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "Scam Detective investigation API" },
    { status: 200 }
  );
}

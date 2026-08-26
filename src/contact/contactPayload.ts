export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
  submissionId: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function parseContactSubmission(
  value: unknown,
): ContactSubmission | null {
  if (!isRecord(value)) {
    return null;
  }

  const name = trimmedString(value.name);
  const email = trimmedString(value.email)?.toLowerCase();
  const company = value.company === undefined ? '' : trimmedString(value.company);
  const message = trimmedString(value.message);
  const submissionId = trimmedString(value.submissionId);

  if (
    !name ||
    name.length > 100 ||
    !email ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    company === null ||
    company.length > 120 ||
    !message ||
    message.length > 5000 ||
    !submissionId ||
    !UUID_V4_PATTERN.test(submissionId)
  ) {
    return null;
  }

  return {
    name,
    email,
    ...(company ? { company } : {}),
    message,
    submissionId,
  };
}

export function isFilledHoneypot(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.website === 'string' &&
    value.website.trim().length > 0
  );
}

function trimmedString(value: unknown): string | null {
  return typeof value === 'string' ? value.trim() : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

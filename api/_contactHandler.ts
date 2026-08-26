import {
  isFilledHoneypot,
  parseContactSubmission,
  type ContactSubmission,
} from '../src/contact/contactPayload.js';

export interface ContactEmail {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  idempotencyKey: string;
}

interface ContactHandlerDependencies {
  sendEmail: (email: ContactEmail) => Promise<void>;
  logger?: Pick<Console, 'error'>;
}

export function createContactHandler({
  sendEmail,
  logger = console,
}: ContactHandlerDependencies) {
  return async function contactHandler(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonResponse(
        { success: false, error: 'Method not allowed.' },
        405,
        { Allow: 'POST' },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return jsonResponse({ success: false, error: 'Invalid JSON.' }, 400);
    }

    if (isFilledHoneypot(body)) {
      return jsonResponse({ success: true });
    }

    const submission = parseContactSubmission(body);

    if (!submission) {
      return jsonResponse(
        { success: false, error: 'Invalid submission.' },
        400,
      );
    }

    try {
      await sendEmail(createContactEmail(submission));
      return jsonResponse({ success: true });
    } catch (error) {
      logger.error('Contact email delivery failed:', error);
      return jsonResponse(
        {
          success: false,
          error: 'Unable to send your message right now. Please try again later.',
        },
        502,
      );
    }
  };
}

function createContactEmail(submission: ContactSubmission): ContactEmail {
  const company = submission.company ?? 'Not provided';

  return {
    from: 'Vincent Fang Portfolio <portfolio@fzvincent.com>',
    to: ['15070654315@163.com'],
    replyTo: submission.email,
    subject: `Portfolio contact from ${submission.name}${
      submission.company ? ` — ${submission.company}` : ''
    }`,
    text:
      `Name: ${submission.name}\n` +
      `Email: ${submission.email}\n` +
      `Company: ${company}\n\n` +
      submission.message,
    idempotencyKey: `contact-${submission.submissionId}`,
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  headers: HeadersInit = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
}

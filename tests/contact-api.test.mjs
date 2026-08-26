import assert from 'node:assert/strict';
import test from 'node:test';

import { createContactHandler } from '../api/_contactHandler.ts';

const submissionId = '123e4567-e89b-42d3-a456-426614174000';

const validSubmission = {
  name: 'Vincent Visitor',
  email: 'visitor@example.com',
  company: 'Example Co',
  message: 'Hello Vincent',
  website: '',
  submissionId,
};

function request(body = validSubmission, method = 'POST') {
  return new Request('https://os.fzvincent.com/api/contact', {
    method,
    headers: { 'content-type': 'application/json' },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}

function setup(options = {}) {
  const sent = [];
  const errors = [];
  const sendEmail = options.sendEmail ?? (async (email) => sent.push(email));
  const handler = createContactHandler({
    sendEmail,
    logger: { error: (...args) => errors.push(args) },
  });

  return { handler, sent, errors };
}

async function json(response) {
  return response.json();
}

test('rejects methods other than POST', async () => {
  const { handler, sent } = setup();
  const response = await handler(request(undefined, 'GET'));

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
  assert.deepEqual(await json(response), {
    success: false,
    error: 'Method not allowed.',
  });
  assert.equal(sent.length, 0);
});

test('rejects malformed JSON', async () => {
  const { handler, sent } = setup();
  const response = await handler(
    new Request('https://os.fzvincent.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{',
    }),
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await json(response), {
    success: false,
    error: 'Invalid JSON.',
  });
  assert.equal(sent.length, 0);
});

const invalidSubmissions = [
  ['blank name', { name: '   ' }],
  ['oversized name', { name: 'n'.repeat(101) }],
  ['invalid email', { email: 'not-an-email' }],
  ['oversized email', { email: `${'a'.repeat(243)}@example.com` }],
  ['oversized company', { company: 'c'.repeat(121) }],
  ['blank message', { message: '   ' }],
  ['oversized message', { message: 'm'.repeat(5001) }],
  ['invalid submission id', { submissionId: 'not-a-uuid' }],
];

for (const [label, replacement] of invalidSubmissions) {
  test(`rejects ${label}`, async () => {
    const { handler, sent } = setup();
    const response = await handler(request({ ...validSubmission, ...replacement }));

    assert.equal(response.status, 400);
    assert.deepEqual(await json(response), {
      success: false,
      error: 'Invalid submission.',
    });
    assert.equal(sent.length, 0);
  });
}

test('silently accepts a filled honeypot without sending email', async () => {
  const { handler, sent } = setup();
  const response = await handler(
    request({ website: 'https://spam.example', submissionId }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), { success: true });
  assert.equal(sent.length, 0);
});

test('normalizes fields and maps a submission to one email', async () => {
  const { handler, sent } = setup();
  const response = await handler(
    request({
      ...validSubmission,
      name: '  Vincent Visitor  ',
      email: '  VISITOR@EXAMPLE.COM  ',
      company: '  Example Co  ',
      message: '  Hello Vincent  ',
    }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), { success: true });
  assert.deepEqual(sent, [
    {
      from: 'Vincent Fang Portfolio <portfolio@fzvincent.com>',
      to: ['15070654315@163.com'],
      replyTo: 'visitor@example.com',
      subject: 'Portfolio contact from Vincent Visitor — Example Co',
      text:
        'Name: Vincent Visitor\n' +
        'Email: visitor@example.com\n' +
        'Company: Example Co\n\n' +
        'Hello Vincent',
      idempotencyKey: `contact-${submissionId}`,
    },
  ]);
});

test('supports an omitted company without changing the recipient', async () => {
  const { handler, sent } = setup();
  const response = await handler(
    request({ ...validSubmission, company: undefined }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), { success: true });
  assert.equal(sent[0].subject, 'Portfolio contact from Vincent Visitor');
  assert.equal(
    sent[0].text,
    'Name: Vincent Visitor\n' +
      'Email: visitor@example.com\n' +
      'Company: Not provided\n\n' +
      'Hello Vincent',
  );
  assert.deepEqual(sent[0].to, ['15070654315@163.com']);
});

test('returns a generic error and logs a fixed prefix when sending fails', async () => {
  const providerError = new Error('private provider detail');
  const { handler, errors } = setup({
    sendEmail: async () => {
      throw providerError;
    },
  });
  const response = await handler(request());

  assert.equal(response.status, 502);
  assert.deepEqual(await json(response), {
    success: false,
    error: 'Unable to send your message right now. Please try again later.',
  });
  assert.equal(errors.length, 1);
  assert.equal(errors[0][0], 'Contact email delivery failed:');
  assert.equal(errors[0][1], providerError);
});

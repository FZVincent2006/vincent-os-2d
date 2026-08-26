# Vincent Portfolio Functional Repairs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the Vincent Fang portfolio's contact, localization, lifecycle, domain, and 3D/2D communication behavior without restoring original-author content.

**Architecture:** The 2D Vercel project owns the React portfolio and a same-origin `/api/contact` Vercel Function backed by Resend. The 3D project remains a static Webpack experience, embeds `os.fzvincent.com`, and accepts monitor events only from that iframe window and origin. Pure validation and message parsing are isolated from framework code so they can be tested without browsers or external services.

**Tech Stack:** React 17, Create React App 5/Jest 27, TypeScript 4.6, Vercel Functions on Node.js 24, Resend 6.22.1, Three.js 0.137, Webpack 5, Node test runner through tsx 4.23.12.

**Spec:** `docs/superpowers/specs/2026-08-26-functional-repairs-design.md`

## Global Constraints

- Modify only `FZVincent2006/vincent-os-2d` and `FZVincent2006/vincent-3d-world`.
- Treat both `henryjeff` upstream remotes as read-only comparison sources.
- Keep all Vincent Fang-authored biography, experience, project, image, resume, and contact content.
- Keep `const TITLE_TEXT = '';` unchanged in the 3D info overlay.
- Do not restore Art, original music players, Henry social links, or removed projects.
- Do not translate the contents of Oregon Trail, Doom, Scrabble, DOSBox, or JSDOS.
- Never commit, print, screenshot, or expose `RESEND_API_KEY`.
- Use Node.js `24.x` for the 2D Vercel build and function runtime.
- Use `https://fzvincent.com` for 3D, `https://www.fzvincent.com` as a redirect, and `https://os.fzvincent.com` for 2D.
- Send contact mail from `Vincent Fang Portfolio <portfolio@fzvincent.com>` to `15070654315@163.com`.
- Use red-green-refactor for every behavioral change and run the stated failing test before production edits.
- Execute in two isolated `codex/functional-repairs-*` worktrees. Preserve the existing 3D `src/tsconfig.json` Mac build change when creating the 3D branch.

---

### Task 1: Establish isolated branches and a clean baseline

**Files:**
- Preserve in 3D branch: `vincent-3d-world/src/tsconfig.json`
- No production file changes in this task.

**Interfaces:**
- Consumes: the current 2D `main` commit containing the approved spec and this plan; the current 3D `main` plus its local `src/tsconfig.json` build fix.
- Produces: isolated `codex/functional-repairs-2d` and `codex/functional-repairs-3d` branches with original-author push remotes disabled.

- [ ] **Step 1: Create both isolated worktrees**

Invoke `superpowers:using-git-worktrees`. Create one worktree from each personal repository. Do not create either worktree from an upstream branch.

Expected branches:

```text
vincent-os-2d:    codex/functional-repairs-2d
vincent-3d-world: codex/functional-repairs-3d
```

- [ ] **Step 2: Disable accidental upstream pushes in both worktrees**

Run in each repository:

```bash
git remote set-url --push upstream DISABLED
git remote -v
```

Expected: `origin` points to `FZVincent2006`; `upstream` fetch points to `henryjeff`; `upstream` push shows `DISABLED`.

- [ ] **Step 3: Preserve the existing 3D Mac build fix**

Ensure `vincent-3d-world/src/tsconfig.json` contains:

```json
"lib": ["DOM", "ES2017"],
"types": []
```

Do not discard the current checkout's uncommitted version while creating the worktree.

- [ ] **Step 4: Install dependencies and run the baseline**

Run separately:

```bash
npm ci
npm run build
```

in `vincent-os-2d`, then run the same two commands in `vincent-3d-world`.

Expected: both builds exit 0. Existing size and unused-import warnings are recorded as baseline warnings, not treated as new failures.

- [ ] **Step 5: Commit the preserved 3D build fix**

Run in `vincent-3d-world`:

```bash
git add src/tsconfig.json
git commit -m "build: support TypeScript compilation on macOS"
```

Expected: only `src/tsconfig.json` is in this commit.

---

### Task 2: Add contact payload validation and the Resend API boundary

**Files:**
- Create: `vincent-os-2d/src/contact/contactPayload.ts`
- Create: `vincent-os-2d/api/_contactHandler.ts`
- Create: `vincent-os-2d/api/contact.ts`
- Create: `vincent-os-2d/tests/contact-api.test.mjs`
- Modify: `vincent-os-2d/package.json`
- Modify: `vincent-os-2d/package-lock.json`

**Interfaces:**
- Consumes: standard `Request`/`Response`, `RESEND_API_KEY`, Resend `emails.send`.
- Produces: `validateContactPayload(input): ContactValidationResult`, `isHoneypotPayload(input): boolean`, `createContactHandler(sendEmail): (request: Request) => Promise<Response>`, and Vercel route `/api/contact`.

- [ ] **Step 1: Add the API test runner and Resend dependency**

Run in `vincent-os-2d`:

```bash
npm install resend@6.22.1
npm install --save-dev tsx@4.23.12
```

Add these package fields:

```json
"engines": {
  "node": "24.x"
},
"scripts": {
  "test:api": "node --import tsx --test tests/contact-api.test.mjs"
}
```

Keep the existing `start`, `build`, `test`, and `eject` scripts.

- [ ] **Step 2: Write failing API behavior tests**

Create `tests/contact-api.test.mjs` with the following test structure:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { createContactHandler } from '../api/_contactHandler.ts';

const validSubmission = {
  name: 'Vincent Visitor',
  email: 'visitor@example.com',
  company: 'Example Co',
  message: 'Hello Vincent',
  website: '',
  submissionId: '82bd5558-4b76-4ca4-9e43-f4b86fece358',
};

const invoke = async ({
  body = validSubmission,
  method = 'POST',
  sendEmail = async () => undefined,
} = {}) => {
  const handler = createContactHandler(sendEmail);
  const request = new Request('https://os.fzvincent.com/api/contact', {
    method,
    headers: { 'content-type': 'application/json' },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  });
  const response = await handler(request);
  return { response, json: await response.json() };
};

test('rejects methods other than POST', async () => {
  const { response, json } = await invoke({ method: 'GET' });
  assert.equal(response.status, 405);
  assert.deepEqual(json, { success: false, error: 'Method not allowed.' });
});

test('rejects malformed JSON', async () => {
  const handler = createContactHandler(async () => undefined);
  const response = await handler(new Request(
    'https://os.fzvincent.com/api/contact',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{',
    },
  ));
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    success: false,
    error: 'Invalid JSON.',
  });
});

test('rejects invalid and oversized fields', async (t) => {
  const cases = [
    ['name', { ...validSubmission, name: '' }],
    ['name-long', { ...validSubmission, name: 'x'.repeat(101) }],
    ['email', { ...validSubmission, email: 'invalid' }],
    ['email-long', { ...validSubmission, email: `${'x'.repeat(244)}@example.com` }],
    ['company', { ...validSubmission, company: 'x'.repeat(121) }],
    ['message', { ...validSubmission, message: 'x'.repeat(5001) }],
    ['submissionId', { ...validSubmission, submissionId: 'not-a-uuid' }],
  ];
  for (const [label, body] of cases) {
    await t.test(label, async () => {
      const { response, json } = await invoke({ body });
      assert.equal(response.status, 400);
      assert.equal(json.success, false);
      assert.equal(typeof json.error, 'string');
    });
  }
});

test('returns success without sending for a filled honeypot', async () => {
  let sends = 0;
  const { response, json } = await invoke({
    body: { website: 'https://spam.example' },
    sendEmail: async () => { sends += 1; },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(json, { success: true });
  assert.equal(sends, 0);
});

test('accepts an empty optional company', async () => {
  const { response, json } = await invoke({
    body: { ...validSubmission, company: '' },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(json, { success: true });
});

test('maps a valid submission to the Resend boundary', async () => {
  let delivered;
  const { response, json } = await invoke({
    sendEmail: async (email) => { delivered = email; },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(json, { success: true });
  assert.deepEqual(delivered, {
    from: 'Vincent Fang Portfolio <portfolio@fzvincent.com>',
    to: ['15070654315@163.com'],
    replyTo: 'visitor@example.com',
    subject: 'Portfolio contact from Vincent Visitor — Example Co',
    text: 'Name: Vincent Visitor\nEmail: visitor@example.com\nCompany: Example Co\n\nHello Vincent',
    idempotencyKey: 'contact-82bd5558-4b76-4ca4-9e43-f4b86fece358',
  });
});

test('returns a generic failure when email delivery fails', async () => {
  const { response, json } = await invoke({
    sendEmail: async () => { throw new Error('provider detail'); },
  });
  assert.equal(response.status, 502);
  assert.deepEqual(json, {
    success: false,
    error: 'Unable to send your message right now. Please try again.',
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run:

```bash
npm run test:api
```

Expected: FAIL because `api/_contactHandler.ts` does not exist.

- [ ] **Step 4: Implement payload normalization and validation**

Create `src/contact/contactPayload.ts` with these exported contracts:

```ts
export interface ContactSubmission {
    name: string;
    email: string;
    company: string;
    message: string;
    website: string;
    submissionId: string;
}

export type ContactValidationResult =
    | { ok: true; value: ContactSubmission }
    | { ok: false; error: string };

export const CONTACT_LIMITS = {
    name: 100,
    email: 254,
    company: 120,
    message: 5000,
} as const;

export const isHoneypotPayload = (input: unknown): boolean =>
    typeof input === 'object' &&
    input !== null &&
    typeof (input as Record<string, unknown>).website === 'string' &&
    (input as Record<string, string>).website.trim().length > 0;

export const validateContactPayload = (
    input: unknown,
): ContactValidationResult => {
    if (typeof input !== 'object' || input === null) {
        return { ok: false, error: 'Invalid form submission.' };
    }

    const record = input as Record<string, unknown>;
    const read = (key: string) =>
        typeof record[key] === 'string' ? record[key].trim() : '';
    const value: ContactSubmission = {
        name: read('name'),
        email: read('email').toLowerCase(),
        company: read('company'),
        message: read('message'),
        website: read('website'),
        submissionId: read('submissionId'),
    };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!value.name || value.name.length > CONTACT_LIMITS.name) {
        return { ok: false, error: 'Please enter a valid name.' };
    }
    if (!emailPattern.test(value.email) || value.email.length > CONTACT_LIMITS.email) {
        return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (value.company.length > CONTACT_LIMITS.company) {
        return { ok: false, error: 'Company name is too long.' };
    }
    if (!value.message || value.message.length > CONTACT_LIMITS.message) {
        return { ok: false, error: 'Please enter a message under 5,000 characters.' };
    }
    if (!uuidPattern.test(value.submissionId)) {
        return { ok: false, error: 'Invalid submission identifier.' };
    }
    return { ok: true, value };
};
```

- [ ] **Step 5: Implement the injectable handler and Vercel entrypoint**

Create `api/_contactHandler.ts`. Export this email boundary:

```ts
export interface ContactEmail {
    from: string;
    to: string[];
    replyTo: string;
    subject: string;
    text: string;
    idempotencyKey: string;
}

export type SendContactEmail = (email: ContactEmail) => Promise<void>;
```

Implement `createContactHandler(sendEmail)` so it:

1. Returns 405 and `Allow: POST` for non-POST requests.
2. Catches `request.json()` failures and returns the exact 400 JSON from the test.
3. Returns `{ success: true }` immediately for `isHoneypotPayload(body)`.
4. Calls `validateContactPayload` and returns its error at HTTP 400.
5. Converts CR/LF sequences in name and company to a single space before building the subject.
6. Builds the exact `ContactEmail` object asserted by the test. Omit the
   ` — company` suffix when company is empty, and render `Company: Not provided`
   in the plain-text body for that case.
7. Logs a fixed `Contact email delivery failed` prefix and the caught provider
   error server-side without logging the request headers or API key.
8. Returns HTTP 200 on delivery and the exact generic HTTP 502 response on exceptions.

Create `api/contact.ts`:

```ts
import { Resend } from 'resend';
import { createContactHandler } from './_contactHandler';

const handler = createContactHandler(async (email) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not configured');
    }
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
        {
            from: email.from,
            to: email.to,
            replyTo: email.replyTo,
            subject: email.subject,
            text: email.text,
        },
        { idempotencyKey: email.idempotencyKey },
    );
    if (error) {
        throw new Error(error.message);
    }
});

export default { fetch: handler };
```

- [ ] **Step 6: Run the API tests and verify GREEN**

Run:

```bash
npm run test:api
```

Expected: all API tests pass with zero failures.

- [ ] **Step 7: Commit the API boundary**

```bash
git add package.json package-lock.json src/contact/contactPayload.ts api tests/contact-api.test.mjs
git commit -m "feat: add Resend contact API"
```

---

### Task 3: Restore the Contact UI and localize its complete flow

**Files:**
- Create: `vincent-os-2d/src/setupTests.ts`
- Create: `vincent-os-2d/src/components/showcase/Contact.test.tsx`
- Modify: `vincent-os-2d/src/components/showcase/Contact.tsx`
- Modify: `vincent-os-2d/src/components/showcase/ResumeDownload.tsx`
- Modify: `vincent-os-2d/src/i18n/translations.ts`

**Interfaces:**
- Consumes: `/api/contact`, `validateContactPayload`, `useLanguage().t`.
- Produces: an accessible localized form with stable success/failure behavior and a localized resume prompt.

- [ ] **Step 1: Add the Jest DOM setup**

Create `src/setupTests.ts`:

```ts
import '@testing-library/jest-dom';

Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: {
        randomUUID: jest.fn(() => '82bd5558-4b76-4ca4-9e43-f4b86fece358'),
    },
});
```

- [ ] **Step 2: Write failing Contact component tests**

Create `src/components/showcase/Contact.test.tsx`. Render `Contact` inside `LanguageProvider`; reset `localStorage` and `global.fetch` after each test. Add these tests:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import Contact from './Contact';
import { LanguageProvider } from '../../i18n/LanguageProvider';

const originalFetch = global.fetch;

afterEach(() => {
    global.fetch = originalFetch;
    localStorage.clear();
    jest.clearAllMocks();
});

const renderContact = (language: 'en' | 'zh' = 'en') => {
    localStorage.setItem('site.language', language);
    return render(
        <LanguageProvider>
            <Contact />
        </LanguageProvider>,
    );
};

const fillValidForm = () => {
    fireEvent.change(screen.getByLabelText(/your name|姓名/i), {
        target: { value: 'Visitor' },
    });
    fireEvent.change(screen.getByLabelText(/^email|邮箱/i), {
        target: { value: 'visitor@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message|留言/i), {
        target: { value: 'Hello Vincent' },
    });
};

test('enables submit only after required fields are valid', () => {
    renderContact();
    const button = screen.getByRole('button', { name: 'Send Message' });
    expect(button).toBeDisabled();
    fillValidForm();
    expect(button).toBeEnabled();
});

test('clears fields after a successful submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
    }) as jest.Mock;
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    expect(await screen.findByText('Message sent. Thank you, Visitor!')).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
});

test('preserves fields and shows a failure returned by the API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, error: 'Unable to send your message right now. Please try again.' }),
    }) as jest.Mock;
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(await screen.findByText('Unable to send your message right now. Please try again.')).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('Visitor');
});

test('renders the complete form in Chinese', () => {
    renderContact('zh');
    expect(screen.getByRole('heading', { name: '联系我' })).toBeInTheDocument();
    expect(screen.getByLabelText('姓名')).toBeInTheDocument();
    expect(screen.getByLabelText('留言')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '发送留言' })).toBeInTheDocument();
    expect(screen.getByText('点击下载我的简历')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the Contact test and verify RED**

```bash
npm test -- --watchAll=false --runInBand src/components/showcase/Contact.test.tsx
```

Expected: FAIL because the API is disabled and the Contact strings are hard-coded English.

- [ ] **Step 4: Add complete Contact and resume translation keys**

Under both `translations.en.showcase` and `translations.zh.showcase`, add a `contact` tree with keys:

```text
heading, intro, emailLabel, nameLabel, namePlaceholder, visitorEmailLabel,
emailPlaceholder, companyLabel, companyPlaceholder, messageLabel,
messagePlaceholder, send, sending, requiredLegend, formLabel, success,
genericFailure, invalidForm
```

English exact status strings must match the tests. Chinese values must use:

```text
heading: 联系我
nameLabel: 姓名
visitorEmailLabel: 邮箱
companyLabel: 公司（选填）
messageLabel: 留言
send: 发送留言
sending: 发送中…
```

Define `success` as `Message sent. Thank you, {name}!` in English and
`留言已发送。谢谢你，{name}！` in Chinese. Replace the `{name}` token with the
submitted name when showing success.

Add `showcase.resume.prompt` and `showcase.resume.download` with English values `Looking for my resume?` and `Click here to download it!`, and Chinese values `需要我的简历吗？` and `点击下载我的简历`.

- [ ] **Step 5: Implement the accessible working form**

Refactor `Contact.tsx` to:

- call `useLanguage()` and render every label/status through `t`;
- use a semantic `<form aria-label={t('showcase.contact.formLabel')} onSubmit={submitForm}>`;
- set `CONTACT_API_URL` to `'/api/contact'`;
- include a visually hidden `website` honeypot with `tabIndex={-1}` and `autoComplete="off"`;
- initialize `submissionId` with `crypto.randomUUID()`;
- validate with `validateContactPayload` before enabling submit;
- call `event.preventDefault()` in `submitForm`;
- send all six payload fields;
- treat either a non-2xx response or `{ success: false }` as a failure;
- show the localized `genericFailure` text for provider, HTTP, JSON, or network
  failures instead of exposing the server's English error detail;
- clear `name`, `email`, `company`, `message`, and `website`, then generate a new UUID only after success;
- retain all values and the same UUID after failure;
- put the status in `<p role="status" aria-live="polite">`;
- clear the four-second status timeout during effect cleanup;
- use `finally` to reset `isLoading`.

Update `ResumeDownload.tsx` to obtain both displayed strings from `useLanguage()` and remove the `altText` override from all call sites.

- [ ] **Step 6: Run Contact tests and the API suite**

```bash
npm test -- --watchAll=false --runInBand src/components/showcase/Contact.test.tsx
npm run test:api
```

Expected: both commands pass with zero failures.

- [ ] **Step 7: Commit the working localized form**

```bash
git add src/setupTests.ts src/components/showcase/Contact.tsx src/components/showcase/Contact.test.tsx src/components/showcase/ResumeDownload.tsx src/components/showcase/About.tsx src/components/showcase/Experience.tsx src/i18n/translations.ts
git commit -m "fix: restore localized contact form"
```

---

### Task 4: Repair translation fallback and localize React-owned desktop text

**Files:**
- Create: `vincent-os-2d/src/i18n/LanguageProvider.test.tsx`
- Create: `vincent-os-2d/src/components/wordle/Wordle.test.tsx`
- Modify: `vincent-os-2d/src/i18n/LanguageProvider.tsx`
- Modify: `vincent-os-2d/src/i18n/translations.ts`
- Modify: `vincent-os-2d/src/constants/Types.d.ts`
- Modify: `vincent-os-2d/src/components/os/Desktop.tsx`
- Modify: `vincent-os-2d/src/components/os/Toolbar.tsx`
- Modify: `vincent-os-2d/src/components/applications/Henordle.tsx`
- Modify: `vincent-os-2d/src/components/applications/Doom.tsx`
- Modify: `vincent-os-2d/src/components/applications/OregonTrail.tsx`
- Modify: `vincent-os-2d/src/components/applications/Scrabble.tsx`
- Modify: `vincent-os-2d/src/components/applications/Credits.tsx`
- Modify: `vincent-os-2d/src/components/wordle/Wordle.tsx`

**Interfaces:**
- Consumes: `Language`, `TranslationTree`, `useLanguage()`.
- Produces: `translate(language, key, source?)`, translated application name keys, and localized Vinordle wrapper/control text.

- [ ] **Step 1: Write failing fallback and Vinordle tests**

In `LanguageProvider.test.tsx`, test a custom translation tree:

```tsx
import { translate } from './LanguageProvider';

test('falls back to English when the active language omits a key', () => {
    const source = {
        en: { sample: { label: 'English fallback' } },
        zh: { sample: {} },
    };
    expect(translate('zh', 'sample.label', source)).toBe('English fallback');
});
```

In `Wordle.test.tsx`, use this test:

```tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import Wordle from './Wordle';

test('renders React-owned game text in Chinese', () => {
    localStorage.setItem('site.language', 'zh');
    render(
        <LanguageProvider>
            <Wordle />
        </LanguageProvider>,
    );
    expect(screen.getByText('带有 VINCE 彩蛋的文字猜谜。')).toBeInTheDocument();
    expect(screen.getByText('回车')).toBeInTheDocument();
    expect(screen.getByText('删除')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run both tests and verify RED**

```bash
npm test -- --watchAll=false --runInBand src/i18n/LanguageProvider.test.tsx src/components/wordle/Wordle.test.tsx
```

Expected: FAIL because `translate` is not exported and Wordle is hard-coded English.

- [ ] **Step 3: Export a pure translator with English fallback**

In `LanguageProvider.tsx`, export:

```ts
export const translate = (
    language: Language,
    key: string,
    source: Record<Language, TranslationTree> = translations,
): string => {
    const active = getNestedValue(source[language], key);
    if (active !== undefined) return active;
    return getNestedValue(source.en, key) ?? '';
};
```

Have the provider's `t` callback call `translate(language, key)`.

- [ ] **Step 4: Define and consume desktop/Vinordle translation keys**

Add `desktop.apps` keys for `showcase`, `trail`, `doom`, `scrabble`, `vinordle`, and `credits`; add `desktop.poweredBy`; add `vinordle.description`, `win`, `gameOver`, `thanks`, `restart`, `enter`, and `delete` in English and Chinese.

Change the application registry from `name` to `nameKey`, and change `DesktopWindows.name` to `DesktopWindows.nameKey`. Translate shortcut names in `Desktop` and active task names in `Toolbar` at render time so switching language updates already-open windows without reopening them.

Replace the shortcut state/effect with a `useMemo` derived from the application
registry, `t`, and the open callback. Open the showcase once by its stable key
`showcase`, never by comparing the translated label `My Showcase`; changing
language must not replace the open showcase window or reset its route.

In each React-owned application wrapper, translate its window title and `Powered by JSDOS & DOSBox` footer. Do not modify the rendered DOS game content.

In `Wordle.tsx`, translate the title wrapper, description, win/game-over copy, restart action, and the displayed labels for internal `RET` and `DEL` controls. Preserve `RET` and `DEL` as the internal action values.

- [ ] **Step 5: Run localization tests and full React suite**

```bash
npm test -- --watchAll=false --runInBand
```

Expected: all React tests pass with zero failures.

- [ ] **Step 6: Commit React-owned localization**

```bash
git add src/i18n src/constants/Types.d.ts src/components/os src/components/applications src/components/wordle
git commit -m "fix: complete interface localization"
```

---

### Task 5: Fix navigation and clock timer lifecycle leaks

**Files:**
- Create: `vincent-os-2d/src/components/general/Link.test.tsx`
- Create: `vincent-os-2d/src/components/os/Toolbar.test.tsx`
- Modify: `vincent-os-2d/src/components/general/Link.tsx`
- Modify: `vincent-os-2d/src/components/os/Toolbar.tsx`

**Interfaces:**
- Consumes: React effect cleanup and browser timer APIs.
- Produces: zero pending Link timers after unmount and exactly one cleaned clock interval per Toolbar mount.

- [ ] **Step 1: Write failing timer cleanup tests**

Create `Link.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Link from './Link';

test('clears pending navigation timers when unmounted', () => {
    jest.useFakeTimers();
    const view = render(
        <MemoryRouter>
            <Link text="About" to="about" />
        </MemoryRouter>,
    );
    fireEvent.mouseDown(screen.getByRole('link', { name: 'About' }));
    expect(jest.getTimerCount()).toBe(2);
    view.unmount();
    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
});
```

Create `Toolbar.test.tsx`:

```tsx
import { render } from '@testing-library/react';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import Toolbar from './Toolbar';

test('owns one clock interval and clears it on unmount', () => {
    jest.useFakeTimers();
    const view = render(
        <LanguageProvider>
            <Toolbar windows={{}} toggleMinimize={jest.fn()} shutdown={jest.fn()} />
        </LanguageProvider>,
    );
    expect(jest.getTimerCount()).toBe(1);
    view.unmount();
    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
});
```

- [ ] **Step 2: Run the tests and verify RED**

```bash
npm test -- --watchAll=false --runInBand src/components/general/Link.test.tsx src/components/os/Toolbar.test.tsx
```

Expected: both tests fail because timers survive unmount or multiply on render.

- [ ] **Step 3: Give Link effect-owned timer cleanup**

In `Link.tsx`, keep timer IDs in a ref:

```tsx
const timers = useRef<number[]>([]);

useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
}, []);
```

Push both 100 ms timer IDs into this ref, remove the local `isMounted` variable, and remove the ignored cleanup function returned by `handleClick`.

- [ ] **Step 4: Replace Toolbar's recursive timeout with one interval**

Move `getTime` outside the component and replace the current effect with:

```tsx
useEffect(() => {
    const interval = window.setInterval(() => setTime(getTime()), 5000);
    return () => window.clearInterval(interval);
}, []);
```

- [ ] **Step 5: Run timer tests and the full React suite**

```bash
npm test -- --watchAll=false --runInBand
```

Expected: all tests pass and Jest reports no pending timer warnings.

- [ ] **Step 6: Commit lifecycle repairs**

```bash
git add src/components/general/Link.tsx src/components/general/Link.test.tsx src/components/os/Toolbar.tsx src/components/os/Toolbar.test.tsx
git commit -m "fix: clean up desktop timers"
```

---

### Task 6: Secure and preserve the 2D-to-3D monitor bridge

**Files:**
- Create: `vincent-os-2d/src/monitorBridge.ts`
- Create: `vincent-os-2d/src/monitorBridge.test.ts`
- Modify: `vincent-os-2d/src/index.tsx`
- Modify: `vincent-os-2d/public/index.html`
- Delete: `vincent-os-2d/tmp_homepage.html`
- Create: `vincent-3d-world/src/Application/World/MonitorMessage.ts`
- Create: `vincent-3d-world/tests/monitor-message.test.mjs`
- Modify: `vincent-3d-world/src/Application/World/MonitorScreen.ts`
- Modify: `vincent-3d-world/package.json`
- Modify: `vincent-3d-world/package-lock.json`

**Interfaces:**
- Consumes: `document.referrer`, `window.parent.postMessage`, iframe `contentWindow`, browser `MessageEvent`.
- Produces: `resolveParentOrigin`, `installMonitorBridge`, `parseMonitorMessage`, exact-source/origin filtering, and the production iframe URL `https://os.fzvincent.com/`.

- [ ] **Step 1: Write failing 2D bridge tests**

Create `src/monitorBridge.test.ts` with tests that:

```ts
expect(resolveParentOrigin('https://fzvincent.com/room')).toBe('https://fzvincent.com');
expect(resolveParentOrigin('https://attacker.example/')).toBeNull();
expect(resolveParentOrigin('http://localhost:8080/?dev')).toBe('http://localhost:8080');
```

Install the bridge against `window` with a mock `{ postMessage: jest.fn() }`, dispatch a `mousemove` event, and assert the exact message and target origin. Call the returned cleanup, dispatch again, and assert no second call.

- [ ] **Step 2: Run 2D bridge tests and verify RED**

```bash
npm test -- --watchAll=false --runInBand src/monitorBridge.test.ts
```

Expected: FAIL because `src/monitorBridge.ts` does not exist.

- [ ] **Step 3: Implement and install the typed 2D bridge**

Export this allowlist from `src/monitorBridge.ts`:

```ts
export const ALLOWED_PARENT_ORIGINS = new Set([
    'https://fzvincent.com',
    'https://www.fzvincent.com',
    'https://os.fzvincent.com',
    'http://localhost:3000',
    'http://localhost:8080',
]);
```

`resolveParentOrigin(referrer)` must parse with `new URL`, return the origin only when allowlisted, and return `null` for empty/invalid/disallowed input.

`installMonitorBridge(eventSource = window, parentWindow = window.parent, referrer = document.referrer)` must:

- return a no-op cleanup when the page is not embedded or the parent is disallowed;
- forward `mousemove`, `mousedown`, `mouseup`, `keydown`, and `keyup`;
- send only `clientX/clientY` for mousemove and `key` for keyboard events;
- call `parentWindow.postMessage(payload, parentOrigin)` with no wildcard;
- return a cleanup that removes all five listeners.

Call `installMonitorBridge()` once from `src/index.tsx`. Delete the inline forwarding script from `public/index.html` and delete the tracked unused `tmp_homepage.html` copy.

- [ ] **Step 4: Run 2D bridge and full React tests**

```bash
npm test -- --watchAll=false --runInBand
```

Expected: all tests pass.

- [ ] **Step 5: Add the 3D Node test runner and write failing parser tests**

In `vincent-3d-world`, install:

```bash
npm install --save-dev tsx@4.23.12
```

Add package script:

```json
"test": "node --import tsx --test tests/*.test.mjs"
```

Create `tests/monitor-message.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { parseMonitorMessage } from '../src/Application/World/MonitorMessage.ts';

test('accepts supported monitor payloads', () => {
  assert.deepEqual(parseMonitorMessage({ type: 'mousemove', clientX: 12, clientY: 34 }), {
    type: 'mousemove', clientX: 12, clientY: 34,
  });
  assert.deepEqual(parseMonitorMessage({ type: 'keydown', key: 'V' }), {
    type: 'keydown', key: 'V',
  });
  assert.deepEqual(parseMonitorMessage({ type: 'mouseup' }), { type: 'mouseup' });
});

test('rejects malformed and unsupported monitor payloads', () => {
  const invalid = [
    null,
    { type: 'click' },
    { type: 'mousemove', clientX: '12', clientY: 34 },
    { type: 'keydown', key: 4 },
    { type: 'keyup', key: 'x'.repeat(65) },
  ];
  invalid.forEach((payload) => assert.equal(parseMonitorMessage(payload), null));
});
```

Run `npm test` and expect RED because the parser module does not exist.

- [ ] **Step 6: Implement parser and exact iframe filtering**

Create `MonitorMessage.ts` with a discriminated union for `mousemove`, `mousedown`, `mouseup`, `keydown`, and `keyup`. Implement `parseMonitorMessage(data)` to return `null` unless coordinates are finite numbers and keys are strings of 1-64 characters.

In `MonitorScreen.ts`:

- set production `iframe.src` to `https://os.fzvincent.com/`;
- retain the `?dev` override `http://localhost:3000/`;
- compute `const iframeOrigin = new URL(iframe.src).origin`;
- register one message handler that first checks `event.source === iframe.contentWindow` and `event.origin === iframeOrigin`;
- call `parseMonitorMessage(event.data)` and return immediately for `null`;
- construct and dispatch the existing synthetic event only for validated messages;
- preserve coordinate scaling and the `inComputer` flag.

- [ ] **Step 7: Run 3D tests and builds**

Run in `vincent-3d-world`:

```bash
npm test
npm run build
```

Run in `vincent-os-2d`:

```bash
npm run build
```

Expected: tests and builds exit 0; only known asset-size or inherited unused-import warnings remain.

- [ ] **Step 8: Commit bridge changes separately in each repository**

In 2D:

```bash
git add src/monitorBridge.ts src/monitorBridge.test.ts src/index.tsx public/index.html tmp_homepage.html
git commit -m "fix: restrict monitor event forwarding"
```

In 3D:

```bash
git add package.json package-lock.json src/Application/World/MonitorMessage.ts src/Application/World/MonitorScreen.ts tests/monitor-message.test.mjs
git commit -m "fix: validate embedded monitor events"
```

---

### Task 7: Replace stale domains, metadata, analytics, and legacy mail code

**Files:**
- Create: `vincent-os-2d/tests/site-metadata.test.mjs`
- Modify: `vincent-os-2d/public/index.html`
- Modify: `vincent-os-2d/public/manifest.json`
- Create: `vincent-3d-world/tests/metadata.test.mjs`
- Modify: `vincent-3d-world/src/index.html`
- Modify: `vincent-3d-world/readme.md`
- Modify: `vincent-3d-world/server/index.ts`
- Modify: `vincent-3d-world/package.json`
- Modify: `vincent-3d-world/package-lock.json`

**Interfaces:**
- Consumes: approved canonical domains and factual Vincent description.
- Produces: canonical metadata with no Henry/RPI/NY/old-domain/old-analytics references and a static-only 3D server.

- [ ] **Step 1: Write failing metadata tests**

Create `vincent-os-2d/tests/site-metadata.test.mjs` using `node:fs` and `node:test`. Assert that `public/index.html` contains:

```html
<title>Vincent Fang — FZOS</title>
<link rel="canonical" href="https://os.fzvincent.com/">
```

Assert that its description is non-empty and that the file does not contain `postMessage` with a wildcard target.

Create `vincent-3d-world/tests/metadata.test.mjs` and assert:

```js
assert.match(html, /<title>Vincent Fang — Portfolio<\/title>/);
assert.match(html, /https:\/\/fzvincent\.com\//);
assert.doesNotMatch(html, /G-4FJBF6WF60|Rensselaer|based in NY|VincentFang\.com/i);
assert.match(readme, /github\.com\/FZVincent2006\/vincent-os-2d/);
assert.doesNotMatch(server, /api\/send-email|nodemailer|FOLIO_PASSWORD/);
assert.equal(packageJson.dependencies.nodemailer, undefined);
assert.equal(packageJson.dependencies.cors, undefined);
assert.equal(packageJson.dependencies['body-parser'], undefined);
```

- [ ] **Step 2: Run metadata tests and verify RED**

Run in 2D:

```bash
npm run test:api
```

Update `test:api` to `node --import tsx --test tests/*.test.mjs` so both Node test files run. Expected: metadata test fails against current HTML.

Run `npm test` in 3D. Expected: metadata test fails against current metadata and legacy server.

- [ ] **Step 3: Apply exact Vincent metadata**

Use this 3D title and description everywhere relevant in `src/index.html`:

```text
Title: Vincent Fang — Portfolio
Description: Vincent Fang's personal portfolio, featuring selected projects, experience, and an interactive 3D desktop.
Canonical URL: https://fzvincent.com/
Preview image: https://fzvincent.com/images/preview-new.jpg
```

Add a canonical link. Remove the complete inherited Google Analytics script block. Keep `TITLE_TEXT` in `InfoOverlay.tsx` empty and untouched.

Use this 2D title and description in `public/index.html` and matching values in `manifest.json`:

```text
Title: Vincent Fang — FZOS
Description: Vincent Fang's interactive 2D portfolio desktop.
Canonical URL: https://os.fzvincent.com/
```

Update `readme.md` to link only to `https://fzvincent.com/`, `https://os.fzvincent.com/`, `https://github.com/FZVincent2006/vincent-os-2d`, and `mailto:15070654315@163.com`. Remove nonexistent Vincent GitHub/Twitter references.

- [ ] **Step 4: Remove the unused 3D mail endpoint**

Delete the `/api/send-email` route and the `cors`, `body-parser`, and `nodemailer` imports from `server/index.ts`. Keep Express static serving and compression. Remove `cors`, `body-parser`, and `nodemailer` from dependencies with:

```bash
npm uninstall cors body-parser nodemailer
```

- [ ] **Step 5: Run metadata tests and builds**

Run in 2D:

```bash
npm run test:api
npm run build
```

Run in 3D:

```bash
npm test
npm run build
```

Expected: all commands exit 0 and stale-reference assertions pass.

- [ ] **Step 6: Commit metadata cleanup separately**

In 2D:

```bash
git add public/index.html public/manifest.json package.json tests/site-metadata.test.mjs
git commit -m "fix: update 2D domain metadata"
```

Include `package-lock.json` if npm changes it while editing scripts.

In 3D:

```bash
git add src/index.html readme.md server/index.ts package.json package-lock.json tests/metadata.test.mjs
git commit -m "fix: replace stale portfolio infrastructure"
```

---

### Task 8: Run complete local verification and browser regression

**Files:**
- Modify only if a failing verification exposes a defect covered by the approved spec.

**Interfaces:**
- Consumes: final worktree branches from Tasks 1-7.
- Produces: fresh automated, build, and end-to-end evidence for both repositories.

- [ ] **Step 1: Run all automated checks from clean terminals**

In 2D:

```bash
npm test -- --watchAll=false --runInBand
npm run test:api
npm run build
git diff --check
git status --short
```

In 3D:

```bash
npm test
npm run build
git diff --check
git status --short
```

Expected: all tests and builds exit 0; `git diff --check` is empty; each status is clean.

- [ ] **Step 2: Start both local sites**

Start 2D on port 3000:

```bash
npm start
```

Start 3D on port 8080 in a second terminal:

```bash
npm run dev
```

- [ ] **Step 3: Run the 2D browser regression**

Open `http://localhost:3000` and verify:

1. Showcase opens automatically.
2. Home, About, Experience, Projects, and Contact routes switch without console errors.
3. Chinese/English toggle updates navigation, Contact, resume prompt, desktop app labels, open toolbar tabs, and Vinordle wrapper text.
4. Contact validation enables submit only for a valid form.
5. Local submit reaches `/api/contact`; without a local Vercel Function it shows a controlled failure and preserves fields rather than crashing.
6. Start menu opens, Vinordle completes with `VINCE`, and Doom creates its canvas.

- [ ] **Step 4: Run the 3D browser regression**

Open `http://localhost:8080/?dev` and verify:

1. Boot sequence completes and START enters the scene.
2. The top-left overlay shows `Vincent Fang` and time with no subtitle line.
3. The monitor iframe loads `http://localhost:3000/`.
4. Mouse movement and keyboard interaction within the monitor continue to affect the embedded desktop.
5. A scripted `MessageEvent` with origin `https://attacker.example` causes no synthetic monitor event.
6. Browser console contains no React unmounted-update warning and no repeating clock timer warning.

- [ ] **Step 5: Stop both servers and record evidence**

Stop both terminal sessions with Ctrl-C. Record exact passing test counts, build exit codes, and browser checks in the task handoff; do not commit screenshots or logs containing session data.

---

### Task 9: Configure Resend, Vercel, Alibaba Cloud DNS, and production domains

**Files:**
- No secret-bearing files.
- Vercel may create `.vercel/`; keep it ignored and uncommitted.

**Interfaces:**
- Consumes: authenticated Resend, Vercel, and Alibaba Cloud sessions; both verified branches.
- Produces: verified sender domain, configured API secret, attached hostnames, valid TLS, and one delivered production contact message.

- [ ] **Step 1: Create preview deployments from the personal branches**

Use the existing personal Vercel projects. Confirm project ownership before linking. Deploy the 2D branch first, then the 3D branch. Do not promote either preview to production in this step.

Expected: both Vercel builds exit 0; the 2D preview exposes `/api/contact`.

- [ ] **Step 2: Configure Resend without exposing the API key**

In Resend:

1. Add `fzvincent.com`.
2. Copy its exact SPF, DKIM, and MX records.
3. Add those records in Alibaba Cloud DNS.
4. Wait until Resend shows the domain as verified.
5. Add the Resend Vercel Marketplace integration to the 2D project or set `RESEND_API_KEY` in Vercel's encrypted Preview and Production environment settings.

Never paste the key into chat, terminal output, source files, or screenshots.

- [ ] **Step 3: Verify the preview contact API**

Send invalid payloads to the 2D preview and verify 400/405 behavior. Send one
honeypot payload and verify HTTP 200 without email delivery. Do not send a real
preview message; reserve the single real delivery test for production.

- [ ] **Step 4: Attach Vercel domains and enter Alibaba DNS records**

Attach:

```text
3D project: fzvincent.com, www.fzvincent.com
2D project: os.fzvincent.com
```

Configure `www.fzvincent.com` to redirect to `fzvincent.com`. In Alibaba Cloud DNS, enter the exact A/CNAME/TXT values Vercel displays rather than hard-coding guessed targets. Wait until Vercel reports all three domains valid and TLS certificates issued.

- [ ] **Step 5: Integrate branches using the development-branch finishing workflow**

Invoke `superpowers:finishing-a-development-branch` for each personal repository. Review the commits, merge only into each repository's own `main`, and push only to each `origin` remote. Never push to `upstream`.

- [ ] **Step 6: Verify production end to end**

Verify:

```text
https://fzvincent.com
https://www.fzvincent.com -> https://fzvincent.com
https://os.fzvincent.com
https://os.fzvincent.com/api/contact
```

Run the same 2D and 3D browser checks from Task 8 against production. Submit exactly one final contact message and confirm delivery at `15070654315@163.com`.

- [ ] **Step 7: Roll back if production verification fails**

If a production check fails, restore the last healthy Vercel production deployment for the affected project. Keep DNS only when it resolves to that healthy deployment; otherwise restore the previous verified DNS record values. Preserve logs and error messages without exposing secrets, fix on the branch, redeploy a preview, and repeat verification before promotion.

---

## Final Verification Gate

Before claiming completion, invoke `superpowers:verification-before-completion` and rerun every command in Task 8 plus the production checks in Task 9. Report:

- React test count and failures.
- 2D Node API/metadata test count and failures.
- 3D Node test count and failures.
- Both production build exit codes.
- Final `git status --short --branch` for both repositories.
- Production URL and TLS status for all three hostnames.
- Whether the one final contact message arrived at `15070654315@163.com`.
- Any remaining warning that predates these changes.

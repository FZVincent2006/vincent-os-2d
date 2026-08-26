import { Resend } from 'resend';

import { createContactHandler } from './_contactHandler.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactHandler = createContactHandler({
  sendEmail: async ({ idempotencyKey, ...email }) => {
    const { error } = await resend.emails.send(email, { idempotencyKey });

    if (error) {
      throw new Error(error.message);
    }
  },
});

export default {
  fetch: contactHandler,
};

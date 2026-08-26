import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LanguageProvider } from '../../i18n/LanguageProvider';
import Contact from './Contact';

function renderContact(language: 'en' | 'zh' = 'en') {
    localStorage.setItem('site.language', language);
    return render(
        <LanguageProvider>
            <Contact />
        </LanguageProvider>,
    );
}

function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((promiseResolve) => {
        resolve = promiseResolve;
    });
    return { promise, resolve };
}

async function completeRequiredFields() {
    await userEvent.type(screen.getByLabelText(/Your name:/), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/Email:/), 'ADA@EXAMPLE.COM');
    await userEvent.type(
        screen.getByLabelText(/Company \(optional\):/),
        'Analytical Engines',
    );
    await userEvent.type(screen.getByLabelText(/Message:/), 'Hello Vincent');
}

beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
});

test('keeps submit disabled until all required fields are valid', async () => {
    renderContact();
    const submit = screen.getByRole('button', { name: 'Send Message' });

    expect(submit).toBeDisabled();
    await completeRequiredFields();
    expect(submit).toBeEnabled();
});

test('posts once to the same-origin endpoint and shows localized success', async () => {
    const response = deferred<{
        ok: boolean;
        json: () => Promise<{ success: true }>;
    }>();
    const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockReturnValue(response.promise as Promise<Response>);

    renderContact();
    await completeRequiredFields();

    const submit = screen.getByRole('button', { name: 'Send Message' });
    await userEvent.click(submit);
    await userEvent.click(submit);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();

    const [, options] = fetchMock.mock.calls[0];
    expect(fetchMock.mock.calls[0][0]).toBe('/api/contact');
    expect(options).toMatchObject({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    const body = JSON.parse(options?.body as string);
    expect(body).toMatchObject({
        name: 'Ada Lovelace',
        email: 'ADA@EXAMPLE.COM',
        company: 'Analytical Engines',
        message: 'Hello Vincent',
        website: '',
    });
    expect(body.submissionId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );

    response.resolve({
        ok: true,
        json: async () => ({ success: true }),
    });

    expect(
        await screen.findByText('Message sent. Thank you, Ada Lovelace!'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Your name:/)).toHaveValue('');
    expect(screen.getByLabelText(/Email:/)).toHaveValue('');
    expect(screen.getByLabelText(/Message:/)).toHaveValue('');
});

test('shows a Chinese generic error instead of exposing provider details', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        json: async () => ({
            success: false,
            error: 'private provider detail',
        }),
    } as Response);

    renderContact('zh');
    await userEvent.type(screen.getByLabelText(/您的姓名：/), '方文森');
    await userEvent.type(screen.getByLabelText(/邮箱：/), 'vincent@example.com');
    await userEvent.type(screen.getByLabelText(/留言：/), '你好');
    await userEvent.click(screen.getByRole('button', { name: '发送留言' }));

    expect(
        await screen.findByText('发送失败，请稍后重试。'),
    ).toBeInTheDocument();
    expect(screen.queryByText('private provider detail')).not.toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
});

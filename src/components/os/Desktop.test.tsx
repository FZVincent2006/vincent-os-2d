import { render, screen } from '@testing-library/react';

import { LanguageProvider } from '../../i18n/LanguageProvider';
import Desktop from './Desktop';

test('does not render a credits shortcut on the desktop', () => {
    localStorage.setItem('site.language', 'en');

    render(
        <LanguageProvider>
            <Desktop />
        </LanguageProvider>,
    );

    expect(screen.queryByText('Credits')).not.toBeInTheDocument();
});

test('shows the Chinese Showcase window title as 方正', async () => {
    localStorage.setItem('site.language', 'zh');

    render(
        <LanguageProvider>
            <Desktop />
        </LanguageProvider>,
    );

    expect(await screen.findByText('方正')).toBeInTheDocument();
});

test('shows 方正 in the Chinese Showcase copyright', async () => {
    localStorage.setItem('site.language', 'zh');

    render(
        <LanguageProvider>
            <Desktop />
        </LanguageProvider>,
    );

    expect(
        await screen.findByText('© 版权所有 2026 方正'),
    ).toBeInTheDocument();
});

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

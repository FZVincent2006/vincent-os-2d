import { fireEvent, render, screen } from '@testing-library/react';

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

test('accepts VINCE as the personalized winning answer', () => {
    localStorage.setItem('site.language', 'en');
    render(
        <LanguageProvider>
            <Wordle />
        </LanguageProvider>,
    );

    for (const letter of ['V', 'I', 'N', 'C', 'E']) {
        const matches = screen.getAllByText(letter);
        fireEvent.mouseDown(matches[matches.length - 1]);
    }
    fireEvent.mouseDown(screen.getByText('Enter'));

    expect(screen.getByText('You win!')).toBeInTheDocument();
});

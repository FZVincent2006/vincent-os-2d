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

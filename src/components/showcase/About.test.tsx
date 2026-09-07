import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import About from './About';

beforeEach(() => localStorage.clear());

test.each([
    {
        language: 'zh',
        firstStory: '第一桶金',
        aiStory: '关于AI',
        removed: /剃光头发|打破任何系统的密钥|这段经历让我发现|在过去的几个月里/,
        oldSection: '关于我',
        future: '展望未来',
    },
    {
        language: 'en',
        firstStory: 'First Pot of Gold',
        aiStory: 'About AI',
        removed: /shaved my head|master keys to breaking any system|This experience made me realize|Over the past few months/,
        oldSection: 'About Me',
        future: 'Looking Forward',
    },
])('renders the revised About sections in $language without removed stories', ({ language, firstStory, aiStory, removed, oldSection, future }) => {
    localStorage.setItem('site.language', language);
    const { container } = render(<LanguageProvider><About /></LanguageProvider>);

    expect(screen.getByRole('heading', { name: firstStory })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: aiStory })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: oldSection })).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(removed);
    expect(screen.getByRole('heading', { name: future })).toBeInTheDocument();

    // Removing story blocks must leave the existing photos and contact intact.
    for (const name of ['珠峰', '纳木错', 'N1']) {
        expect(screen.getByRole('img', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: '15070654315@163.com' }))
        .toHaveAttribute('href', 'mailto:15070654315@163.com');
});

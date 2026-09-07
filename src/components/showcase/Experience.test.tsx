import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageProvider';
import Experience from './Experience';

const ExperienceWithLanguageSwitch = () => {
    const { toggleLanguage } = useLanguage();
    return <><button onClick={toggleLanguage}>Switch language</button><Experience /></>;
};

beforeEach(() => localStorage.clear());

test('places the internship photo between the ZhenFund and Talentry headings', () => {
    localStorage.setItem('site.language', 'zh');
    render(<LanguageProvider><Experience /></LanguageProvider>);

    const internship = screen.getByRole('heading', { level: 1, name: '真格基金实习' });
    const photo = screen.getByRole('img', { name: 'ZhenFund internship gathering' });
    const talentry = screen.getByRole('heading', { level: 1, name: 'Talentry' });
    expect(internship.compareDocumentPosition(photo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(photo.compareDocumentPosition(talentry) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('keeps the revised experience sections in order when switching languages', () => {
    localStorage.setItem('site.language', 'zh');
    const { container } = render(
        <LanguageProvider><ExperienceWithLanguageSwitch /></LanguageProvider>,
    );

    expect(screen.getAllByRole('heading', { level: 1 }).map(heading => heading.textContent))
        .toEqual(['真格基金实习', 'Talentry', '第一桶金', '技术探索']);
    expect(container.textContent).not.toMatch(/OpenClaw|教育背景/);

    fireEvent.click(screen.getByRole('button', { name: 'Switch language' }));

    expect(screen.getAllByRole('heading', { level: 1 }).map(heading => heading.textContent))
        .toEqual(['ZhenFund Internship', 'Talentry', 'First Pot of Gold', 'Technical Exploration']);
    expect(container.textContent).not.toMatch(/OpenClaw|Education & Philosophy|真格基金实习/);
});

test('adds the Talentry group photo without dropping the existing experience photos', () => {
    render(<LanguageProvider><Experience /></LanguageProvider>);

    const groupPhoto = screen.getByRole('img', { name: 'Talentry group gathering' });
    expect(groupPhoto).toHaveAttribute('src');
    for (const name of ['Talentry', 'Party Nights', 'Attrax', 'YC China']) {
        expect(screen.getByRole('img', { name })).toBeInTheDocument();
    }
});

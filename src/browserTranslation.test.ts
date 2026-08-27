import { readFileSync } from 'fs';
import path from 'path';

test('keeps browser translation disabled for the bilingual desktop', () => {
    const template = readFileSync(
        path.join(process.cwd(), 'public', 'index.html'),
        'utf8',
    );
    const page = new DOMParser().parseFromString(template, 'text/html');

    expect(page.documentElement.translate).toBe(false);
});

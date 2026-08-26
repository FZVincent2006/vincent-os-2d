import { render } from '@testing-library/react';

import { LanguageProvider } from '../../i18n/LanguageProvider';
import Toolbar from './Toolbar';

afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
});

test('owns one clock interval and clears it on unmount', () => {
    jest.useFakeTimers();
    const intervalSpy = jest.spyOn(window, 'setInterval');
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    const view = render(
        <LanguageProvider>
            <Toolbar
                windows={{}}
                toggleMinimize={jest.fn()}
                shutdown={jest.fn()}
            />
        </LanguageProvider>,
    );

    expect(intervalSpy).toHaveBeenCalledTimes(1);
    const intervalId = intervalSpy.mock.results[0].value;
    view.unmount();
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalId);
});

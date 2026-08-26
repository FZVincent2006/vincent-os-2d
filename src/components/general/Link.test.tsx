import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Link from './Link';

afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
});

test('clears pending navigation timers when unmounted', () => {
    jest.useFakeTimers();
    const timeoutSpy = jest.spyOn(window, 'setTimeout');
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const view = render(
        <MemoryRouter>
            <Link text="About" to="about" />
        </MemoryRouter>,
    );

    const callsBeforeClick = timeoutSpy.mock.calls.length;
    fireEvent.mouseDown(screen.getByRole('link', { name: 'About' }));
    const ownedTimerIds = timeoutSpy.mock.results
        .slice(callsBeforeClick)
        .map((result) => result.value);
    expect(ownedTimerIds).toHaveLength(2);

    view.unmount();
    ownedTimerIds.forEach((timerId) => {
        expect(clearTimeoutSpy).toHaveBeenCalledWith(timerId);
    });
});

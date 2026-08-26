import { installMonitorBridge, resolveParentOrigin } from './monitorBridge';

test('resolves only approved parent origins', () => {
    expect(resolveParentOrigin('https://fzvincent.com/room')).toBe(
        'https://fzvincent.com',
    );
    expect(resolveParentOrigin('https://attacker.example/')).toBeNull();
    expect(resolveParentOrigin('http://localhost:8080/?dev')).toBe(
        'http://localhost:8080',
    );
    expect(resolveParentOrigin('not a URL')).toBeNull();
});

test('forwards an allowlisted event with an exact target origin and cleans up', () => {
    const parentWindow = { postMessage: jest.fn() };
    const cleanup = installMonitorBridge(
        window,
        parentWindow,
        'https://fzvincent.com/room',
    );

    window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 12, clientY: 34 }),
    );
    expect(parentWindow.postMessage).toHaveBeenCalledWith(
        { type: 'mousemove', clientX: 12, clientY: 34 },
        'https://fzvincent.com',
    );

    cleanup();
    window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 56, clientY: 78 }),
    );
    expect(parentWindow.postMessage).toHaveBeenCalledTimes(1);
});

test('does not install forwarding for a disallowed parent', () => {
    const parentWindow = { postMessage: jest.fn() };
    const cleanup = installMonitorBridge(
        window,
        parentWindow,
        'https://attacker.example/',
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'V' }));
    expect(parentWindow.postMessage).not.toHaveBeenCalled();
    cleanup();
});

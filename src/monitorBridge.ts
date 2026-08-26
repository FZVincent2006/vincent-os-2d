export const ALLOWED_PARENT_ORIGINS = new Set([
    'https://fzvincent.com',
    'https://www.fzvincent.com',
    'https://os.fzvincent.com',
    'http://localhost:3000',
    'http://localhost:8080',
]);

interface MonitorEventSource {
    addEventListener: Window['addEventListener'];
    removeEventListener: Window['removeEventListener'];
}

interface MonitorParentWindow {
    postMessage: (message: unknown, targetOrigin: string) => void;
}

export const resolveParentOrigin = (referrer: string): string | null => {
    if (!referrer) {
        return null;
    }

    try {
        const origin = new URL(referrer).origin;
        return ALLOWED_PARENT_ORIGINS.has(origin) ? origin : null;
    } catch {
        return null;
    }
};

export const installMonitorBridge = (
    eventSource: MonitorEventSource = window,
    parentWindow: MonitorParentWindow = window.parent,
    referrer: string = document.referrer,
): (() => void) => {
    const parentOrigin = resolveParentOrigin(referrer);

    if (!parentOrigin || parentWindow === (eventSource as unknown)) {
        return () => undefined;
    }

    const post = (message: Record<string, unknown>) => {
        parentWindow.postMessage(message, parentOrigin);
    };
    const handleMouseMove = (event: MouseEvent) => {
        post({
            type: 'mousemove',
            clientX: event.clientX,
            clientY: event.clientY,
        });
    };
    const handleMouseDown = () => post({ type: 'mousedown' });
    const handleMouseUp = () => post({ type: 'mouseup' });
    const handleKeyDown = (event: KeyboardEvent) =>
        post({ type: 'keydown', key: event.key });
    const handleKeyUp = (event: KeyboardEvent) =>
        post({ type: 'keyup', key: event.key });

    eventSource.addEventListener('mousemove', handleMouseMove);
    eventSource.addEventListener('mousedown', handleMouseDown);
    eventSource.addEventListener('mouseup', handleMouseUp);
    eventSource.addEventListener('keydown', handleKeyDown);
    eventSource.addEventListener('keyup', handleKeyUp);

    return () => {
        eventSource.removeEventListener('mousemove', handleMouseMove);
        eventSource.removeEventListener('mousedown', handleMouseDown);
        eventSource.removeEventListener('mouseup', handleMouseUp);
        eventSource.removeEventListener('keydown', handleKeyDown);
        eventSource.removeEventListener('keyup', handleKeyUp);
    };
};

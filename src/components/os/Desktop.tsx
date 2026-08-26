import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Colors from '../../constants/colors';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import Doom from '../applications/Doom';
import OregonTrail from '../applications/OregonTrail';
import ShutdownSequence from './ShutdownSequence';
// import ThisComputer from '../applications/ThisComputer';
import Henordle from '../applications/Henordle';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import Scrabble from '../applications/Scrabble';
import { IconName } from '../../assets/icons';
import Credits from '../applications/Credits';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const APPLICATIONS: {
    [key in string]: {
        key: string;
        nameKey: string;
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    // computer: {
    //     key: 'computer',
    //     name: 'This Computer',
    //     shortcutIcon: 'computerBig',
    //     component: ThisComputer,
    // },
    showcase: {
        key: 'showcase',
        nameKey: 'desktop.apps.showcase',
        shortcutIcon: 'showcaseIcon',
        component: ShowcaseExplorer,
    },
    trail: {
        key: 'trail',
        nameKey: 'desktop.apps.trail',
        shortcutIcon: 'trailIcon',
        component: OregonTrail,
    },
    doom: {
        key: 'doom',
        nameKey: 'desktop.apps.doom',
        shortcutIcon: 'doomIcon',
        component: Doom,
    },
    scrabble: {
        key: 'scrabble',
        nameKey: 'desktop.apps.scrabble',
        shortcutIcon: 'scrabbleIcon',
        component: Scrabble,
    },
    henordle: {
        key: 'henordle',
        nameKey: 'desktop.apps.vinordle',
        shortcutIcon: 'henordleIcon',
        component: Henordle,
    },
    credits: {
        key: 'credits',
        nameKey: 'desktop.apps.credits',
        shortcutIcon: 'credits',
        component: Credits,
    },
};

const getHighestZIndex = (openWindows: DesktopWindows): number =>
    Object.values(openWindows).reduce(
        (highest, openWindow) => Math.max(highest, openWindow.zIndex),
        0,
    );

const Desktop: React.FC<DesktopProps> = () => {
    const { t } = useLanguage();
    const [windows, setWindows] = useState<DesktopWindows>({});

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const toggleMinimize = useCallback((key: string) => {
        setWindows((openWindows) => {
            const newWindows = { ...openWindows };
            const highestIndex = getHighestZIndex(openWindows);
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key] = {
                ...newWindows[key],
                zIndex: highestIndex + 1,
            };
            return newWindows;
        });
    }, []);

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: 1 + getHighestZIndex(prevWindows),
                },
            }));
        },
        [],
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: getHighestZIndex(prevState) + 1,
                    minimized: false,
                    component: element,
                    nameKey: APPLICATIONS[key].nameKey,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [],
    );

    const openApplication = useCallback(
        (key: string) => {
            const app = APPLICATIONS[key];
            addWindow(
                app.key,
                <app.component
                    onInteract={() => onWindowInteract(app.key)}
                    onMinimize={() => minimizeWindow(app.key)}
                    onClose={() => removeWindow(app.key)}
                    key={app.key}
                />,
            );
        },
        [addWindow, minimizeWindow, onWindowInteract, removeWindow],
    );

    const shortcuts = useMemo<DesktopShortcutProps[]>(
        () =>
            Object.values(APPLICATIONS).map((app) => ({
                shortcutName: t(app.nameKey),
                icon: app.shortcutIcon,
                onOpen: () => openApplication(app.key),
            })),
        [openApplication, t],
    );

    useEffect(() => {
        openApplication('showcase');
    }, [openApplication]);

    return !shutdown ? (
        <div style={styles.desktop}>
            {/* For each window in windows, loop over and render  */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, {
                                top: i * 104,
                            })}
                            key={Object.keys(APPLICATIONS)[i]}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
            />
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: Colors.turquoise,
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcutContainer: {
        position: 'absolute',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;

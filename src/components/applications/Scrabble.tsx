import React, { useState } from 'react';
import DosPlayer from '../dos/DosPlayer';
import Window from '../os/Window';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface ScrabbleAppProps extends WindowAppProps {}

const ScrabbleApp: React.FC<ScrabbleAppProps> = (props) => {
    const { t } = useLanguage();
    const [width, setWidth] = useState(920);
    const [height, setHeight] = useState(750);

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle={t('desktop.apps.scrabble')}
            windowBarIcon="windowGameIcon"
            windowBarColor="#941d13"
            bottomLeftText={t('desktop.poweredBy')}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            minimizeWindow={props.onMinimize}
        >
            <DosPlayer
                width={width}
                height={height}
                bundleUrl="scrabble.jsdos"
            />
        </Window>
    );
};

export default ScrabbleApp;

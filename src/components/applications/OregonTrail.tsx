import React, { useState } from 'react';
import DosPlayer from '../dos/DosPlayer';
import Window from '../os/Window';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface OregonTrailAppProps extends WindowAppProps {}

const OregonTrailApp: React.FC<OregonTrailAppProps> = (props) => {
    const { t } = useLanguage();
    const [width, setWidth] = useState(920);
    const [height, setHeight] = useState(750);

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle={t('desktop.apps.trail')}
            windowBarIcon="windowGameIcon"
            windowBarColor="#240C00"
            bottomLeftText={t('desktop.poweredBy')}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
        >
            <DosPlayer width={width} height={height} bundleUrl="trail.jsdos" />
        </Window>
    );
};

export default OregonTrailApp;

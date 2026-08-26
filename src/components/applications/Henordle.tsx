import React from 'react';
import Window from '../os/Window';
import Wordle from '../wordle/Wordle';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface HenordleAppProps extends WindowAppProps {}

const HenordleApp: React.FC<HenordleAppProps> = (props) => {
    const { t } = useLanguage();

    return (
        <Window
            top={20}
            left={300}
            width={600}
            height={860}
            windowBarIcon="windowGameIcon"
            windowTitle={t('desktop.apps.vinordle')}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={t('showcase.copyright')}
        >
            <div className="site-page">
                <Wordle />
            </div>
        </Window>
    );
};

export default HenordleApp;

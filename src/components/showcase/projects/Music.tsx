import React from 'react';
import { useLanguage } from '../../../i18n/LanguageProvider';

export interface MusicProjectsProps {}

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    const { t } = useLanguage();

    return (
        <div className="site-page-content">
            <h1>{t('showcase.music.pageTitle')}</h1>
            <h3>{t('showcase.music.pageSubtitle')}</h3>
            <br />
            <div className="text-block">
                <p>{t('showcase.music.listening')}</p>
                <br />
                <p>{t('showcase.music.piano')}</p>
            </div>
        </div>
    );
};

export default MusicProjects;

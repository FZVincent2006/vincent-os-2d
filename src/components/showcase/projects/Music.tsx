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
                <p>
                    <b>{t('showcase.music.sparkTitle')}:</b> {t('showcase.music.sparkDescription')}
                </p>
                <br />
                <p>
                    <b>{t('showcase.music.peakTitle')}:</b> {t('showcase.music.peakDescription')}
                </p>
                <br />
                <p>
                    <b>{t('showcase.music.catharsisTitled')}:</b> {t('showcase.music.catharticDescription')}
                </p>
                <br />
                <p>
                    <b>{t('showcase.music.softerTitle')}:</b> {t('showcase.music.softerDescription')}
                </p>
                <br />
                <p>
                    <b>{t('showcase.music.futureTitle')}:</b> {t('showcase.music.futureDescription')}
                </p>
                <br />
            </div>
        </div>
    );
};

export default MusicProjects;

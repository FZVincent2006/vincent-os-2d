import React from 'react';
import { useLanguage } from '../../../i18n/LanguageProvider';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    const { t } = useLanguage();

    return (
        <div className="site-page-content">
            <h1>{t('showcase.projects.softwarePageTitle')}</h1>
            <h3>{t('showcase.projects.softwarePageSubtitle')}</h3>
            <br />
            <div className="text-block">
                <p>{t('showcase.projects.softwarePageIntro')}</p>
                <br />
                <p>{t('showcase.projects.softwareThoughts')}</p>
            </div>
        </div>
    );
};

export default SoftwareProjects;

import React from 'react';
import beiketown from '../../../assets/pictures/beiketown.jpg';
import { useLanguage } from '../../../i18n/LanguageProvider';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    const { t } = useLanguage();
    
    return (
        <div className="site-page-content">
            <h1>{t('showcase.projects.softwarePageTitle')}</h1>
            <h3>{t('showcase.projects.softwarePageSubtitle')}</h3>
            <br />
            <p>
                {t('showcase.projects.softwarePageIntro')}
            </p>
            <br />
            <div className="text-block">
                <h2>{t('showcase.projects.beiketownTitle')}</h2>
                <br />
                <p>
                    {t('showcase.projects.beiketownDescription')}
                </p>
                <br />
                <div className="captioned-image">
                    <img src={beiketown} alt="beiketown" style={styles.image} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> {t('showcase.projects.beiketownCaption')}
                        </sub>
                    </p>
                </div>
                <p>
                    {t('showcase.projects.beiketownCommunity')}
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    caption: {
        width: '80%',
    },
    image: {
        width: '100%',
        maxWidth: 900,
        display: 'block',
    },
};

export default SoftwareProjects;

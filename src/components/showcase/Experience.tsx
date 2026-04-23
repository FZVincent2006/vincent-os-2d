import React from 'react';
import talentry from '../../assets/pictures/Talentry.jpg';
import attrax from '../../assets/pictures/attrax.jpg';
import partyNights from '../../assets/pictures/party nights.jpg';
import ycChina from '../../assets/pictures/YC China.jpg';
import ResumeDownload from './ResumeDownload';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    const { t } = useLanguage();
    
    return (
        <div className="site-page-content">
            <ResumeDownload />

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('showcase.experience.pageTitle')}</h1>
                        <h4>{t('showcase.experience.talentryRole')}</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('showcase.experience.talentryTitle')}</h3>
                        <b>
                            <p>{t('showcase.experience.talentryDate')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>{t('showcase.experience.talentryPoint1')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.talentryPoint2')}</p>
                        <img
                            src={talentry}
                            style={styles.talentryImage}
                            alt="Talentry"
                        />
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('showcase.experience.opencrawTitle')}</h1>
                        <h4>{t('showcase.experience.opencrawRole')}</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('showcase.experience.opencrawTitle')}</h3>
                        <b>
                            <p>{t('showcase.experience.opencrawDate')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>{t('showcase.experience.opencrawPoint1')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.opencrawPoint2')}</p>
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('showcase.experience.indieTitle')}</h1>
                        <h4>{t('showcase.experience.indieRole')}</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('showcase.experience.indieTitle')}</h3>
                        <b>
                            <p>{t('showcase.experience.indieDate')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>{t('showcase.experience.indiePoint1')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.indiePoint2')}</p>
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('showcase.experience.firstVentureTitle')}</h1>
                        <h4>{t('showcase.experience.firstVentureRole')}</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('showcase.experience.firstVentureRole')}</h3>
                        <b>
                            <p>{t('showcase.experience.firstVentureDate')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>{t('showcase.experience.firstVenturePoint')}</p>
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('showcase.experience.technicalTitle')}</h1>
                        <h4>{t('showcase.experience.technicalSubtitle')}</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('showcase.experience.technicalSubtitle')}</h3>
                        <b>
                            <p>{t('showcase.experience.technicalDate')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>{t('showcase.experience.technicalPoint')}</p>
                    </li>
                </ul>
                <br />
                <h3 style={styles.indent}>{t('showcase.experience.hackathonTitle')}</h3>
                <ul>
                    <li>
                        <p>{t('showcase.experience.hackathon1')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.hackathon2')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.hackathon3')}</p>
                    </li>
                </ul>
                <div style={styles.hackathonImageRow}>
                    <img
                        src={partyNights}
                        style={styles.hackathonImage}
                        alt="Party Nights"
                    />
                    <img
                        src={attrax}
                        style={styles.hackathonImage}
                        alt="Attrax"
                    />
                </div>
                <br />
                <h3 style={styles.indent}>{t('showcase.experience.hackerTitle')}</h3>
                <ul>
                    <li>
                        <p>{t('showcase.experience.hackerPoint1')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.hackerPoint2')}</p>
                        <img
                            src={ycChina}
                            style={styles.talentryImage}
                            alt="YC China"
                        />
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('showcase.experience.educationTitle')}</h1>
                        <h4>{t('showcase.experience.educationRole')}</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('showcase.experience.educationRole')}</h3>
                        <b>
                            <p>{t('showcase.experience.educationCurrent')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>{t('showcase.experience.educationPoint1')}</p>
                    </li>
                    <li>
                        <p>{t('showcase.experience.educationPoint2')}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    talentryImage: {
        width: '100%',
        maxWidth: 560,
        marginTop: 12,
    },
    hackathonImageRow: {
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        marginTop: 12,
    },
    hackathonImage: {
        flex: 1,
        minWidth: 240,
        maxWidth: 'calc(50% - 8px)',
        width: '100%',
    },
};

export default Experience;

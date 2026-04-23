import React from 'react';
import eShan from '../../assets/pictures/珠峰.jpg';
import namCo from '../../assets/pictures/纳木错.jpg';
import n1 from '../../assets/pictures/N1.png';
import ResumeDownload from './ResumeDownload';
import { useLanguage } from '../../i18n/LanguageProvider';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    const { t } = useLanguage();
    
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>{t('showcase.about.welcome')}</h1>
            <h3>{t('showcase.about.greeting')}</h3>
            <br />
            <div className="text-block">
                <p>{t('showcase.about.hustler')}</p>
                <br />
                <p>
                    {t('showcase.about.role')}{' '}
                    <a href="mailto:15070654315@163.com">
                        15070654315@163.com
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>{t('showcase.about.aboutMeTitle')}</h3>
                <br />
                <p>{t('showcase.about.aboutMe1')}</p>
                <br />
                <p>{t('showcase.about.aboutMe2')}</p>
                <br />
                <h3>{t('showcase.about.goldPotTitle')}</h3>
                <br />
                <p>{t('showcase.about.goldPot1')}</p>
                <br />
                <div className="captioned-image">
                    <img src={eShan} style={styles.image} alt="珠峰" />
                    <p>
                        <sub>
                            <b>Figure 1:</b> 珠峰
                        </sub>
                    </p>
                </div>
                <br />
                <div className="captioned-image">
                    <img src={namCo} style={styles.image} alt="纳木错" />
                    <p>
                        <sub>
                            <b>Figure 2:</b> 纳木错
                        </sub>
                    </p>
                </div>
                <br />
                <p>{t('showcase.about.goldPot2')}</p>
                <br />
                <h3>{t('showcase.about.aiCodeTitle')}</h3>
                <br />
                <p>{t('showcase.about.aiCode1')}</p>
                <br />
                <figure style={styles.photoFigure}>
                    <img src={n1} style={styles.photoThumb} alt="N1" />
                    <figcaption style={styles.photoCaption}>
                        <sub>
                            <b>Figure 3:</b> N1
                        </sub>
                    </figcaption>
                </figure>
                <br />
                <p>{t('showcase.about.aiCode2')}</p>
                <br />
                <h3>{t('showcase.about.lookingForwardTitle')}</h3>
                <br />
                <p>{t('showcase.about.lookingForward')}</p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    photoFigure: {
        width: '100%',
        margin: 0,
    },
    photoThumb: {
        width: '100%',
        height: 'auto',
        borderRadius: 8,
    },
    photoCaption: {
        textAlign: 'center',
        marginTop: 6,
    },
};

export default About;

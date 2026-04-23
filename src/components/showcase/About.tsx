import React from 'react';
import eShan from '../../assets/pictures/珠峰.jpg';
import namCo from '../../assets/pictures/纳木错.jpg';
import n1 from '../../assets/pictures/N1.png';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm Vincent Fang</h3>
            <br />
            <div className="text-block">
                <p>
                    Hello, I'm Vincent Fang. I am a hustler currently exploring
                    AI, business models, and connecting talent.
                </p>
                <br />
                <p>
                    I am studying at the University of Science and Technology
                    Beijing (USTB) and also serve as the founder of Talentry.
                    If you have any questions or comments, feel free to reach
                    out by email at{' '}
                    <a href="mailto:15070654315@163.com">
                        15070654315@163.com
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <p>
                    Since high school, I have been intensely curious about
                    things outside the "rules". To escape the boring sea of
                    test papers, I built a custom sliding slot under my desk to
                    hide my phone and see the outside world. During my senior
                    year, to get my ticket to Beijing and aim for the Finance
                    Department at Renmin University, I shaved my head and
                    locked myself away to study for three months. Although my
                    gaokao results were not perfect, I made it to Beijing as I
                    wished.
                </p>
                <br />
                <p>
                    I firmly believe that curiosity and relentless,
                    stop-at-nothing execution are the master keys to breaking
                    any system.
                </p>
                <br />
                <h3>First Pot of Gold & Entrepreneurial Instinct</h3>
                <br />
                <p>
                    After the 2024 gaokao, my family rejected my plan to travel
                    to Tibet, but I did not give up. I noticed the immense
                    anxiety parents had about their kids falling behind during
                    summer break. Leveraging poster campaigns and the
                    endorsement of being an outstanding senior, I quickly
                    gathered a top-tier student base. In just 15 days, by
                    integrating the teaching abilities of my classmates, I
                    earned my first 100,000 RMB.
                </p>
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
                <p>
                    This experience made me realize my true talent lies not
                    just in solving problems, but in finding leverage and
                    building ecosystems.
                </p>
                <br />
                <h3>AI, Code & Hackathons</h3>
                <br />
                <p>
                    Entering college, I quickly became disillusioned with
                    traditional GPA routines and fully embraced AI and coding. I
                    participated in foundational LLM research with members of
                    DeepSeek, and even reverse-engineered our school's SSO
                    gateway during a hackathon. I gradually realized my true
                    comparative advantage lies not in resonating with machines,
                    but in engaging with people.
                </p>
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
                <p>
                    Over the past few months, I led the execution of the
                    Openclaw competition, which featured a prize pool exceeding
                    one million RMB, and secured nearly ten million RMB in
                    government event funding in collaboration with Beijing
                    Zhongguancun College. I believe high-density talent
                    collisions are the fastest catalyst for personal growth.
                </p>
                <br />
                <h3>Looking Forward</h3>
                <br />
                <p>
                    I will never stop hustling and exploring. In the process of
                    seeking PMF (product-market fit), I am also striving to
                    find my personal pmf (people-mission fit). I am currently
                    exploring this path, which is exactly the original
                    intention behind founding Talentry: to help everyone grow
                    rapidly, and in doing so, to help myself.
                </p>
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

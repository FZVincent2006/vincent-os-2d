import React from 'react';
import talentry from '../../assets/pictures/Talentry.jpg';
import attrax from '../../assets/pictures/attrax.jpg';
import partyNights from '../../assets/pictures/party nights.jpg';
import ycChina from '../../assets/pictures/YC China.jpg';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Entrepreneurial & Operating Experience</h1>
                        <h4>Founder @ Talentry | Talent Partner @ TTC</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Founder / Talent Partner</h3>
                        <b>
                            <p>Mar 2026 - Present</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Curating the Smartest Minds: Independently
                            spearheaded invite-only closed-door events for
                            early-stage AI talent. Successfully gathered a
                            high-density network of top-tier technical brains,
                            including GLM-5 core contributors, Kimi (Moonshot
                            AI) prodigies, and Tsinghua Yao Class IOI national
                            team members.
                        </p>
                    </li>
                    <li>
                        <p>
                            Ecosystem Building: Backed by TTC founder Liaoyuan
                            Ning to co-build an AI-native talent pool. Leading
                            the supply-side sourcing strategy and platform
                            logic. Recently assisted in executing the TTC x
                            Google closed-door summit.
                        </p>
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
                        <h1>OpenClaw Hackathon</h1>
                        <h4>Lead Organizer</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Lead Organizer</h3>
                        <b>
                            <p>Aug 2025 - Mar 2026</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Navigating Complex Systems & ~¥10M Resource
                            Leverage: Spotted the unmatched density of tech
                            talent across Beijing's universities and initiated
                            the "Beijing Hackathon" project. When the original
                            organizing partner collapsed and top-tier
                            universities (Tsinghua/PKU) hesitated to endorse, I
                            broke the deadlock. I brought in Zhongguancun
                            College and government stakeholders, helped
                            re-craft their narrative, and successfully
                            co-unlocked a funding pool of nearly 10 million
                            RMB.
                        </p>
                    </li>
                    <li>
                        <p>
                            Extreme Delivery & Ecosystem Building: Acted as the
                            ultimate safety net when the official host team
                            failed to execute. Capitalizing on the emerging
                            OpenClaw wave, I stepped in as the operator
                            and shipped a massive hackathon with a ¥1M+ prize
                            pool in just one week, handling everything from
                            ecosystem building and VIP curation to end-to-end
                            community operations.
                        </p>
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Indie Developer & Tech Consultant</h1>
                        <h4>Independent Builder</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Indie Developer / Consultant</h3>
                        <b>
                            <p>Oct 2025 - Feb 2026</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Cross-Border E-commerce AI Agent: Spotted an
                            arbitrage opportunity in the cross-border market.
                            Engineered an end-to-end automated Agent framework
                            to completely automate product hunting and listing.
                            (Note: Shut it down voluntarily after realizing it
                            was just a "quick-cash" lifestyle business with a
                            low ceiling, pivoted to build things that actually
                            matter.)
                        </p>
                    </li>
                    <li>
                        <p>
                            Digital Transformation Consultant: Designed the core
                            digital transformation framework for a leading
                            traditional enterprise in Shandong, proving
                            cross-industry problem-solving capabilities.
                        </p>
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>My First Bootstrapped Venture</h1>
                        <h4>Post-High School</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Bootstrapped Founder</h3>
                        <b>
                            <p>Summer 2024</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Zero to ¥100k in 15 Days: Spotted an information
                            asymmetry and high-margin opportunity in the local
                            tutoring market. Hustled for leads via street-level
                            sales and matched them with top-scoring peers
                            (Tsinghua/Peking Univ. admits) who couldn't sell but
                            could teach. A perfect lesson in leverage, resource
                            allocation, and executing a profitable closed-loop.
                        </p>
                    </li>
                </ul>
            </div>

            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Technical DNA & The Hacker Spirit</h1>
                        <h4>LLM Research & Frontier Exploration</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Research Exploration</h3>
                        <b>
                            <p>Jun 2025 - Aug 2025</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Invited to join a DeepSeek-affiliated LLM research
                            group (working under Jingyang Yuan on LLMs, coding,
                            and operators) after a deep technical debate with a
                            MiraclePlus (YC China) alumni. Walked away due to
                            unreasonable contract terms, but kept the
                            high-signal network of top-tier peers.
                        </p>
                    </li>
                </ul>
                <br />
                <h3 style={styles.indent}>Hackathon Track Record</h3>
                <ul>
                    <li>
                        <p>
                            1st Place: Origin Community Party Nights (Catalyzed
                            the TTC partnership & Talentry).
                        </p>
                    </li>
                    <li>
                        <p>
                            2nd Place: Tsinghua Univ. Attrax Hackathon (Got
                            ZhenFund's attention).
                        </p>
                    </li>
                    <li>
                        <p>2nd Place: AdventureX Hackathon.</p>
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
                <h3 style={styles.indent}>Bypassing the Gatekeepers (Hacker Spirit)</h3>
                <ul>
                    <li>
                        <p>
                            Reverse Engineering: During the Tsinghua Hackathon,
                            I grew frustrated with cross-school auth blockers. I
                            reverse-engineered and bypassed the USTB SSO
                            gateway, securing campus-wide login access and
                            ensuring community safety.
                        </p>
                    </li>
                    <li>
                        <p>
                            Social Engineering: To understand what the top 1%
                            of founders were building, I forged a 5Y Capital
                            official email address and successfully "hacked" my
                            way into the highly exclusive MiraclePlus (YC China)
                            Fall Demo Day.
                        </p>
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
                        <h1>Education & Philosophy</h1>
                        <h4>USTB</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>
                            Sophomore, Telecommunications Engineering
                            <br />
                            (Transferred from Civil Engineering)
                        </h3>
                        <b>
                            <p>Current</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            My Vibe: Figured out the "college GPA & competition
                            game" in month one, maxed out my extra credits, and
                            immediately opted out of the rat race. I invest 100%
                            of my energy into exploring frontier tech and
                            connecting raw technical talent with the real
                            commercial world.
                        </p>
                    </li>
                    <li>
                        <p>
                            Core Traits: Aggressively anti-involution. I build
                            things, break rules (respectfully), and actively
                            hunt for high-density talent nodes.
                        </p>
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

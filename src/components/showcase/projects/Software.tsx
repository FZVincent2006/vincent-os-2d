import React from 'react';
import beiketown from '../../../assets/pictures/beiketown.jpg';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below is my own software project.
            </p>
            <br />
            <div className="text-block">
                <h2>beiketown</h2>
                <br />
                <p>
                    Beiketown is an open 2D pixel world powered by the Openclaw
                    multi-agent architecture. It allows any student to incubate
                    their own Openclaw agents at a low cost or seamlessly plug
                    in their existing ones. The entire ecosystem is governed by
                    a top-level orchestrator agent managing the underlying
                    agent swarm. Within this pixelated campus, students can
                    break the ice and interact, fully supported by a built-in
                    video chat system.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={beiketown} alt="beiketown" style={styles.image} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Beiketown overview.
                        </sub>
                    </p>
                </div>
                <p>
                    At its core, Beiketown is a community, making governance and
                    operations critical. To tackle this, I casually
                    reverse-engineered USTB's SSO gateway to implement strict
                    student-authenticated logins, effectively keeping the
                    community secure and preventing out-of-bounds behavior.
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

import React from 'react';

export interface MusicProjectsProps {}

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Music Odyssey</h1>
            <h3>SYSTEM.AUDIO</h3>
            <br />
            <div className="text-block">
                <p>
                    <b>The Spark:</b> It all started at the age of 4. I
                    remember walking past a piano store and being completely
                    captivated by the melody of "Mariage d'Amour." That single
                    moment sparked a journey that would last years.
                </p>
                <br />
                <p>
                    <b>The Peak & The Burnout:</b> I progressed through the
                    formal grading system at a relentless pace, completing Grade
                    10 by the summer before my 5th-grade year. However, the joy
                    of playing was soon swallowed by the grind of exam-focused
                    practice. After hitting that final milestone, I didn't
                    touch the keys for nearly three years, the interest was
                    simply gone.
                </p>
                <br />
                <p>
                    <b>Catharsis in Chaos:</b> I picked up piano again in middle
                    school as a way to decompress. Whenever the workload became
                    overwhelming, I would find myself at the bench, tearing
                    through Beethoven's Moonlight Sonata, 3rd Movement. It
                    wasn't just playing; it was more like "pounding the piano"
                    to release the stress (haha).
                </p>
                <br />
                <p>
                    <b>A Softer Side:</b> Throughout high school, my playing
                    time dwindled, with one notable exception: I practiced
                    Mozart's Twelve Variations on 'Ah vous dirai-je, Maman'
                    just to make my little sister (who is 12 years younger than
                    me) smile.
                </p>
                <br />
                <p>
                    <b>The Next Sync:</b> I've definitely grown rusty over the
                    years, but my next goal is to set up a digital piano in my
                    dorm. It's time to bring the music back into my daily
                    routine.
                </p>
                <br />
            </div>
        </div>
    );
};

export default MusicProjects;

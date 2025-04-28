import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import EnhancedSection from '../components/EnchantedSection/EnhancedSection.jsx';
import NetflixSection from '../components/NetflixSection/NetflixSection.jsx';
import StorySection from '../components/StorySection/StorySection.tsx';
import OpenWorld from '../components/OpenWorld/OpenWorld.jsx';
import MonsterHunter from '../components/MonsterHunter/MonsterHunter.jsx';
import News from '../components/NewsSection/News.jsx';

const Home = () => {
    return (
        <main>
            <HeroSection />
            <EnhancedSection />
            <NetflixSection />
            <StorySection />
            <OpenWorld />
            <MonsterHunter />
            <News />
            <section id="media" className="section-media section"></section>
            <section id="backstory" className="section-backstory section"></section>
            <section id="community" className="section-community section"></section>
        </main>
    );
};

export default Home;

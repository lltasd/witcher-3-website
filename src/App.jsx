import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator.jsx';
import HeroSection from './components/HeroSection.jsx';
import EnhancedSection from './components/EnchantedSection/EnhancedSection.jsx';
import NetflixSection from './components/NetflixSection/NetflixSection.jsx';
import StorySection from './components/StorySection/StorySection.tsx';
import OpenWorld from './components/OpenWorld/OpenWorld.jsx';
import News from './components/NewsSection/News.jsx';
import MonsterHunter from "./components/MonsterHunter/MonsterHunter.jsx";
import MediaSection from "./components/MediaSection/MediaSection.jsx";
import CommunityCorner from "./components/CommunityCorner/CommunityCorner.jsx";
import FooterSection from "./components/FooterSection/FooterSection.jsx";
import GameSection from './components/GameSection/GameSection.jsx';
import WitcherWebsite from "./components/WitcherWebsite/WitcherWebsite.jsx";
import './App.css';

const App = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app">
            <Header scrollPosition={scrollPosition} scrollToSection={scrollToSection} />
            {location.pathname === '/' && <ScrollIndicator />}

            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <section id="header" className="Header">
                                <HeroSection />
                            </section>

                            <section id="enhancedSection" className="EnhancedSection">
                                <EnhancedSection />
                            </section>

                            <section id="netflixSection" className="NetflixSection">
                                <NetflixSection />
                            </section>

                            <section id="story" className="section-story">
                                <StorySection />
                            </section>

                            <section id="openworld" className="section-openworld">
                                <OpenWorld />
                            </section>

                            <section id="hunter" className="section-hunter">
                                <MonsterHunter />
                            </section>

                            <section id="news" className="section-news">
                                <News />
                            </section>

                            <section id="media" className="section-media">
                                <MediaSection />
                            </section>

                            <section id="community" className="section-community">
                                <CommunityCorner />
                                <h2>Community Section</h2>
                            </section>

                            <section id="footer" className="section-footer">
                                <FooterSection />
                            </section>
                        </main>
                    }
                />
                <Route path="/game" element={<GameSection />} />
                <Route path="/witcher-website" element={<WitcherWebsite />} />
            </Routes>
        </div>
    );
};

export default App;

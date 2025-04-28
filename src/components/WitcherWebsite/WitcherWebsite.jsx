import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function WitcherWebsite() {
    const [scrollY, setScrollY] = useState(0);
    const contentRef = useRef(null);
    const videoRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [gamesDropdownOpen, setGamesDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll();

    const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const videoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.3]);
    const videoBlur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
    const contentScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

    const headerLogoOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const headerTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    const games = [
        'The Witcher 4',
        'The Witcher 3: Wild Hunt',
        'The Witcher 2: Assassins Of Kings',
        'The Witcher: Enhanced Edition',
        'Thronebreaker: The Witcher Tales',
        'GWENT®: The Witcher Card Game',
        'The Witcher Adventure Game'
    ];

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Header */}
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrollY > 50 ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
            }`}>
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="relative h-8">
                        <motion.button
                            style={{ opacity: headerTextOpacity }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-xl font-cinzel absolute inset-0 flex items-center"
                        >
                            HOME
                        </motion.button>
                        <motion.img
                            src="https://cdn-l-mkt.cdprojektred.com/image/CDPR-logo-white_xyqk6s.png"
                            alt="CD Projekt RED"
                            style={{ opacity: headerLogoOpacity }}
                            className="h-full absolute inset-0"
                        />
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="relative">
                            <button
                                onMouseEnter={() => setGamesDropdownOpen(true)}
                                onMouseLeave={() => setGamesDropdownOpen(false)}
                                className="nav-link"
                            >
                                GAMES
                            </button>
                            {gamesDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-sm border border-gray-800">
                                    {games.map(game => (
                                        <a key={game} href="#" className="block px-4 py-3 hover:bg-witcher-red/10 transition-colors">
                                            {game}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <a href="#" className="nav-link">CONCERTS</a>
                        <a href="#" className="nav-link">MODDING</a>
                        <a href="#" className="nav-link">NEWS</a>
                        <a href="#" className="nav-link">COMMUNITY</a>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="btn btn-primary px-6">BUY NOW</button>
                        <button className="rounded-full w-8 h-8 border border-gray-400 flex items-center justify-center">
                            EN
                        </button>
                    </div>

                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        MENU
                    </button>
                </div>
            </header>

            {/* Video Hero */}
            <motion.div
                className="relative h-screen"
                style={{
                    opacity: videoOpacity,
                    scale: videoScale,
                }}
            >
                <motion.video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: `blur(${videoBlur}px)` }}
                >
                    <source src="https://wdrfree.com/stock/The-Witcher-3-Wild-Hunt-Gameplay-Trailer.mp4" type="video/mp4" />
                </motion.video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <motion.img
                        src="https://cdn-l-mkt.cdprojektred.com/image/W3-wild-hunt-logo-English_5a63cptbsz.png"
                        alt="The Witcher 3"
                        className="w-full max-w-3xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button className="btn btn-primary px-8 py-3">EXPLORE</button>
                        <button className="btn btn-outline px-8 py-3">WATCH TRAILER</button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
                ref={contentRef}
                className="relative min-h-screen"
                style={{
                    opacity: contentOpacity,
                    y: contentY,
                    scale: contentScale
                }}
            >
                <div className="relative z-10 container mx-auto px-4 py-24">
                    <motion.div
                        className="max-w-4xl mx-auto text-center mb-32"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-6xl font-cinzel mb-8 tracking-wider">DISCOVER, CREATE & DOWNLOAD MODS</h2>
                        <p className="text-xl text-gray-200 mb-12 tracking-wide">
                            USE THE SAME POWERFUL TOOLS AS DEVELOPERS OF THE WITCHER 3: WILD HUNT
                            TO MAKE PC MODS, OR DISCOVER WHAT THE COMMUNITY HAS CREATED.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button className="btn btn-outline border-2 px-8 py-4 text-lg tracking-wider">
                                I WANT TO MAKE MODS
                            </button>
                            <button className="btn btn-outline border-2 px-8 py-4 text-lg tracking-wider">
                                I WANT TO PLAY WITH MODS
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <a href="#contest" className="inline-block text-witcher-red hover:text-white transition-colors duration-300 text-lg mb-32">
                            THE WITCHER 3 REDKIT CONTEST &gt;
                        </a>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {['EPIC GAMES', 'GOG.COM', 'STEAM'].map((platform) => (
                                <div
                                    key={platform}
                                    className="border-2 border-gray-700 p-8 hover:border-witcher-red transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                                >
                                    <span className="text-2xl font-cinzel">{platform}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="bg-[#0A0A0A] py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between gap-8 mb-12">
                        <img
                            src="https://cdn-l-mkt.cdprojektred.com/image/CDPR-logo-white_xyqk6s.png"
                            alt="CD PROJEKT RED"
                            className="h-8"
                        />
                        <div className="flex gap-8">
                            <img src="https://cdn-l-mkt.cdprojektred.com/image/cyberpunk-logo-white_eos3o9.png" alt="Cyberpunk" className="h-8" />
                            <img src="https://cdn-l-mkt.cdprojektred.com/image/gwent-logo-white_e5lgzs.png" alt="GWENT" className="h-8" />
                            <img src="https://cdn-l-mkt.cdprojektred.com/image/gear-logo-white_hu97jk.png" alt="GEAR" className="h-8" />
                        </div>
                    </div>
                    <div className="text-center text-gray-500 text-sm">
                        <p>© 2025 CD PROJEKT S.A. All rights reserved. CD PROJEKT, The Witcher and The Witcher Logo are trademarks of CD PROJEKT S.A.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default WitcherWebsite;
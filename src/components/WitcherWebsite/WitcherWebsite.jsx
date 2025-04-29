import React, { useState, useEffect, useRef } from 'react';
import './WitcherWebsite.css';

function WitcherWebsite() {
    const [scrollY, setScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileGamesOpen, setMobileGamesOpen] = useState(false);

    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const moddingRef = useRef(null);
    const gameplayRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            animateOnScroll();
        };

        const animateOnScroll = () => {
            const parallaxElems = document.querySelectorAll('.parallax-element');

            parallaxElems.forEach((elem) => {
                const rect = elem.getBoundingClientRect();
                const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);

                if (isVisible) {
                    const speed = elem.getAttribute('data-speed') || 0.1;
                    const direction = elem.getAttribute('data-direction') || 1;
                    const offset = window.scrollY * speed * direction;
                    elem.style.transform = `translateY(${offset}px)`;
                    elem.style.opacity = '1';
                    elem.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease';
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const games = [
        'The Witcher 4',
        'The Witcher 3: Wild Hunt',
        'The Witcher 2: Assassins Of Kings',
        'The Witcher: Enhanced Edition',
        'Thronebreaker: The Witcher Tales',
        'GWENT®: The Witcher Card Game',
        'The Witcher Adventure Game'
    ];

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            const headerHeight = 80;
            const elementPosition = ref.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setMenuOpen(false);
    };

    const getParallaxStyle = () => {
        const easedScroll = Math.pow(scrollY / 1000, 1.5);
        const opacity = Math.min(1, Math.max(0, easedScroll));
        const translateY = scrollY * 0.15;

        return {
            opacity,
            translateY,
            backgroundPos: `center ${scrollY * 0.25}px`
        };
    };

    const getLogoStyle = () => {
        const scale = Math.max(0.6, 1 - Math.pow(scrollY / 1000, 1.8));
        const opacity = Math.max(0, 1 - Math.pow(scrollY / 500, 1.5));

        return {
            transform: `scale(${scale})`,
            opacity
        };
    };

    return (
        <div className="witcher-site-container">
            <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
                <div className="header-container">
                    <a href="#hero" className="home-link" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(heroRef);
                    }}>
                        {scrollY > 100 ? (
                            <img src="/tw3.png" alt="Witcher Logo" className="header-logo" />
                        ) : (
                            <span className="header-text">ГЛАВНАЯ</span>
                        )}
                    </a>
                    <nav className="main-nav">
                        <div className="dropdown nav-item">
                            <span className="nav-item-text">СЕРИЯ ИГР</span>
                            <div className="dropdown-menu">
                                {games.map((game, index) => (
                                    <a key={index} href="#" className="dropdown-item">
                                        {game}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <a href="#" className="nav-item">МУЗЫКА</a>
                        <a href="#content" className="nav-item" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(contentRef);
                        }}>МОДЫ & ГЕЙМПЛЕЙ</a>
                        <a href="#" className="nav-item">СООБЩЕСТВО</a>
                    </nav>
                    <div className="header-cta">
                        <button className="btn btn-primary">КУПИТЬ</button>
                        <div className="language-select">RU</div>
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? 'Закрыть' : 'Меню'}
                    </button>
                </div>
            </header>

            <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    <nav className="mobile-menu-nav">
                        <div className="mobile-dropdown">
                            <button
                                className="mobile-dropdown-toggle"
                                onClick={() => setMobileGamesOpen(!mobileGamesOpen)}
                            >
                                СЕРИЯ ИГР <span>{mobileGamesOpen ? '−' : '+'}</span>
                            </button>
                            <div className={`mobile-dropdown-content ${mobileGamesOpen ? 'active' : ''}`}>
                                {games.map((game, index) => (
                                    <a key={index} href="#" className="mobile-nav-item">
                                        {game}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <a href="#" className="mobile-nav-item">МУЗЫКА</a>
                        <a href="#content" className="mobile-nav-item" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(contentRef);
                        }}>МОДЫ & ГЕЙМПЛЕЙ</a>
                        <a href="#" className="mobile-nav-item">СООБЩЕСТВО</a>
                    </nav>

                    <button className="btn btn-primary mobile-buy">КУПИТЬ</button>
                    <div className="mobile-language-select">RU</div>
                </div>
            </div>

            <section id="hero" ref={heroRef} className="video-hero">
                <video
                    className="video-background"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        transform: `scale(${1 + scrollY * 0.0005})`
                    }}
                >
                    <source src="/6405365303845.mp4" type="video/mp4" />
                </video>

                <div className="video-overlay parallax-overlay" style={{
                    backgroundImage: `linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, ${0.5 + getParallaxStyle().opacity * 0.2}) 0%,
                        rgba(0, 0, 0, ${0.3 + getParallaxStyle().opacity * 0.1}) 50%,
                        rgba(0, 0, 0, ${0.7 + getParallaxStyle().opacity * 0.1}) 100%
                    )`,
                    backdropFilter: `blur(${scrollY * 0.01}px)`
                }}></div>

                <div className="hero-content">
                    <img
                        src="/redkit.webp"
                        alt="REDKIT"
                        className="redkit-logo"
                        style={getLogoStyle()}
                    />
                    <div className="scroll-indicator" style={{ opacity: Math.max(0, 1 - scrollY / 400) }}>
                        <span>Scroll</span>
                        <div className="scroll-arrow"></div>
                    </div>
                </div>
            </section>

            <section id="content" ref={contentRef} className="combined-content-section">
                <div
                    className="parallax-background"
                    style={{
                        backgroundPosition: `center ${scrollY * 0.15}px`,
                        transform: `scale(${1 + scrollY * 0.0001})`,
                        opacity: Math.min(0.4, 0.1 + scrollY * 0.0005)
                    }}
                ></div>

                <div id="modding" ref={moddingRef} className="content-inner modding-content">
                    <div className="content-wrapper">
                        <h2
                            className="section-title parallax-element fade-in"
                            data-speed="0.04"
                            data-direction="1"
                        >
                            СОЗДАВАЙТЕ, ИЩИТЕ И ЗАГРУЖАЙТЕ МОДЫ
                        </h2>

                        <p
                            className="section-desc parallax-element fade-in"
                            data-speed="0.02"
                            data-direction="1"
                        >
                            ИСПОЛЬЗУЙТЕ ТЕ ЖЕ МОЩНЫЕ ИНСТРУМЕНТЫ, ЧТО И РАЗРАБОТЧИКИ THE WITCHER 3: WILD HUNT,
                            ЧТОБЫ СОЗДАВАТЬ МОДЫ ДЛЯ ПК, ИЛИ ОТКРОЙТЕ ДЛЯ СЕБЯ, ЧТО СОЗДАЛО СООБЩЕСТВО.
                        </p>

                        <div
                            className="btn-group parallax-element fade-in"
                            data-speed="0.01"
                            data-direction="1"
                        >
                            <button className="btn btn-outline">Я Хочу Создавать Моды</button>
                            <button className="btn btn-outline">Я Хочу Играть С Модами</button>
                        </div>

                        <a
                            href="#contest"
                            className="contest-link parallax-element fade-in"
                            data-speed="0.005"
                            data-direction="1"
                        >
                            КОНКУРС МОДОВ THE WITCHER 3 REDKIT &gt;
                        </a>

                        <div className="store-platforms">
                            {['EPIC GAMES', 'GOG.COM', 'STEAM'].map((platform, index) => (
                                <div
                                    key={index}
                                    className="platform-card parallax-element fade-in"
                                    data-speed={`0.00${7 - index}`}
                                    data-direction="1"
                                >
                                    <span className="platform-name">{platform}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="parallax-divider">
                    <div className="divider-symbol">
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="var(--witcher-red)" opacity="0.8" />
                        </svg>
                    </div>
                </div>
                <div id="gameplay" ref={gameplayRef} className="content-inner gameplay-content">
                    <div className="content-wrapper">
                        <h2
                            className="section-title parallax-element fade-in"
                            data-speed="0.04"
                            data-direction="-1"
                        >
                            ПОГРУЗИТЕСЬ В ЭПИЧЕСКОЕ ПРИКЛЮЧЕНИЕ
                        </h2>

                        <p
                            className="section-desc parallax-element fade-in"
                            data-speed="0.02"
                            data-direction="-1"
                        >
                            ИССЛЕДУЙТЕ ОГРОМНЫЙ ОТКРЫТЫЙ МИР И ОТПРАВЛЯЙТЕСЬ В ЭПИЧЕСКОЕ ПУТЕШЕСТВИЕ
                            В РОЛИ ЛЕГЕНДАРНОГО ВЕДЬМАКА ГЕРАЛЬТА ИЗ РИВИИ. СРАЗИТЕСЬ С ОПАСНЫМИ МОНСТРАМИ,
                            УЧАСТВУЙТЕ В СЛОЖНЫХ ПОЛИТИЧЕСКИХ ИНТРИГАХ И ДЕЛАЙТЕ ВЫБОР,
                            КОТОРЫЙ ИЗМЕНИТ МИР ВОКРУГ ВАС.
                        </p>

                        <div
                            className="btn-group parallax-element fade-in"
                            data-speed="0.01"
                            data-direction="-1"
                        >
                            <button className="btn btn-primary">Смотреть Геймплей</button>
                            <button className="btn btn-outline">Посмотреть Скриншоты</button>
                        </div>

                        <div
                            className="game-features parallax-element fade-in"
                            data-speed="0.005"
                            data-direction="-1"
                        >
                            <div className="feature">
                                <h3>ОТКРЫТЫЙ МИР</h3>
                                <p>Исследуйте обширные просторы Северных Королевств</p>
                            </div>
                            <div className="feature">
                                <h3>ЭПИЧЕСКИЕ СРАЖЕНИЯ</h3>
                                <p>Используйте комбинации мечей, знаков и эликсиров</p>
                            </div>
                            <div className="feature">
                                <h3>НЕПРОСТОЙ ВЫБОР</h3>
                                <p>Ваши решения влияют на судьбу мира игры</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="redkit-explanation">
                    <div className="explanation-content">
                        <h2>The Witcher 3 REDkit</h2>
                        <p>
                            Это инструмент для создания модификаций, разработанный CD PROJEKT RED и Yigsoft.
                            С его помощью вы можете менять и дополнять мир игры «Ведьмак 3: Дикая Охота».
                            Делайте собственные моды на ПК, или скачивайте работы других игроков.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-logos">
                            <img src="/api/placeholder/150/40" alt="CD PROJEKT RED" className="footer-logo" />
                        </div>
                        <div className="footer-logos">
                            <img src="/api/placeholder/100/30" alt="Cyberpunk" className="footer-logo" />
                            <img src="/api/placeholder/100/30" alt="GWENT" className="footer-logo" />
                            <img src="/api/placeholder/100/30" alt="GEAR" className="footer-logo" />
                        </div>
                    </div>

                    <div className="footer-social">
                        {['facebook', 'twitter', 'instagram', 'youtube', 'discord'].map((platform, index) => (
                            <a key={index} href="#" className="social-icon">
                                <span className="icon-placeholder"></span>
                            </a>
                        ))}
                    </div>

                    <div className="footer-copyright">
                        <p>© 2025 CD PROJEKT S.A. All rights reserved. CD PROJEKT, The Witcher and The Witcher Logo are trademarks of CD PROJEKT S.A.</p>

                        <div className="footer-links">
                            <a href="#" className="footer-link">Privacy Policy</a>
                            <a href="#" className="footer-link">Terms of Service</a>
                            <a href="#" className="footer-link">Cookie Policy</a>
                            <a href="#" className="footer-link">Fan Content Guidelines</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default WitcherWebsite;
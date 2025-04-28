import React, { useState, useEffect } from 'react';
import './FooterSection.css';

const FooterSection = () => {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH');
    const languages = ['ENGLISH', 'POLSKI', 'DEUTSCH', 'FRANÇAIS', 'ESPAÑOL', 'ITALIANO', 'РУССКИЙ', '中文'];

    const toggleLanguageMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
    };

    const selectLanguage = (lang) => {
        setSelectedLanguage(lang);
        setShowLanguageMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showLanguageMenu && !event.target.closest('.language-selector')) {
                setShowLanguageMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showLanguageMenu]);

    return (
        <footer id="footer">
            <div className="footer-container">
                <nav className="footer-nav">
                    {['SUPPORT', 'USER AGREEMENT', 'CAREERS', 'FAN CONTENT GUIDELINES', 'PRESS CENTER', 'STORE'].map((item, index) => (
                        <a key={index} href="#" className="nav-item">
                            {item}
                            <span className="nav-item-underline"></span>
                        </a>
                    ))}
                </nav>

                <div className="social-icons">
                    <a href="#" className="social-icon-link twitter" aria-label="Twitter">
                        <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                    <a href="#" className="social-icon-link facebook" aria-label="Facebook">
                        <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className="social-icon-link youtube" aria-label="YouTube">
                        <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className="social-icon-link discord" aria-label="Discord">
                        <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                        </svg>
                    </a>
                </div>

                <div className="cookie-declaration">
                    <a href="#" className="cookie-link">Cookie declaration</a>
                </div>

                <div className="copyright-text">
                    CD PROJEKT®, The Witcher® are registered trademarks of CD PROJEKT Capital Group. The Witcher game © CD PROJEKT S.A. Developed by CD PROJEKT S.A. All rights reserved. The Witcher game is set in the universe created by Andrzej Sapkowski in his series of books. All other copyrights and trademarks are the property of their respective owners.
                </div>

                <div className="language-selector">
                    <button className="language-button" onClick={toggleLanguageMenu}>
                        {selectedLanguage}
                        <svg className={`arrow-down ${showLanguageMenu ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    {showLanguageMenu && (
                        <div className="language-dropdown">
                            {languages.map((lang, index) => (
                                <button
                                    key={index}
                                    className={`language-option ${selectedLanguage === lang ? 'active' : ''}`}
                                    onClick={() => selectLanguage(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="company-logo">
                    <img src="/public/logopnnngg.png" alt="CD Projekt Red" className="logo-image" />
                </div>

                <div className="rating-section">
                    <div className="rating-icons">
                        <img src="/public/18.png" alt="18+ Rating" className="rating-image" />
                        <div className="additional-ratings">
                            <div className="rating-icon">
                                <span>@+!#</span>
                            </div>
                            <div className="rating-icon">
                                <span>♂♀</span>
                            </div>
                            <div className="rating-icon">
                                <span>⚔</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="terms-privacy">
                    <a href="#" className="terms-link">Terms of Use & Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
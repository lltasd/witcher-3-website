import { useState } from 'react'

import './GameSection.css'

const GameSection = () => {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [showStores, setShowStores] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        setShowStores(true);
    };

    const handleBackToSelection = () => {
        setShowStores(false);
    };

    const handleToggleContent = () => {
        setShowContent(!showContent);
    };

    const renderPlatformButtons = () => (
        <>
            <h2 className="platform-title">Выберите Платформу</h2>
            <div className="platforms-grid">
                <button
                    className={`platform-button ${selectedPlatform === 'pc' ? 'selected' : ''}`}
                    onClick={() => handlePlatformSelect('pc')}
                >
                    <span className="platform-name pc">PC</span>
                </button>

                <button
                    className={`platform-button ${selectedPlatform === 'xbox' ? 'selected' : ''}`}
                    onClick={() => handlePlatformSelect('xbox')}
                >
                    <span className="platform-name xbox">XBOX</span>
                </button>

                <button
                    className={`platform-button ${selectedPlatform === 'playstation' ? 'selected' : ''}`}
                    onClick={() => handlePlatformSelect('playstation')}
                >
                    <span className="platform-name playstation">PlayStation</span>
                </button>

                <button
                    className={`platform-button ${selectedPlatform === 'switch' ? 'selected' : ''}`}
                    onClick={() => handlePlatformSelect('switch')}
                >
                    <span className="platform-name switch">Switch</span>
                </button>
            </div>
        </>
    );

    const renderStoreSelection = () => {
        const storesByPlatform = {
            pc: [
                { id: 'gog', name: 'GOG.COM', logo: '/gogcom.webp' },
                { id: 'epic', name: 'Epic Games', logo: '/epicg.webp' },
                { id: 'steam', name: 'Steam', logo: '/steam.webp' }
            ],
            xbox: [
                { id: 'microsoft', name: 'Microsoft Store', logo: '/mst.webp' }
            ],
            playstation: [
                { id: 'ps-store', name: 'PlayStation Store', logo: '/pst.webp' }
            ],

            switch: [
                { id: 'nintendo', name: 'Nintendo eShop', logo: '/nint.jpg' }
            ]
        };

        const stores = storesByPlatform[selectedPlatform] || [];

        return (
            <>
                <h2 className="platform-title">
                    Выберите Магазин - {selectedPlatform.toUpperCase()}
                </h2>
                <div className="stores-grid">
                    {stores.map(store => (
                        <button key={store.id} className="store-button">
                            <img src={store.logo} alt={store.name} className="store-logo" />
                            <span className="store-name">{store.name}</span>
                        </button>
                    ))}
                </div>
                <button className="back-button" onClick={handleBackToSelection}>
                    <span className="back-icon">←</span> НАЗАД
                </button>
            </>
        );
    };

    const renderGameContent = () => (
        <div className="game-content-modal">
            <div className="content-container">
                <h2 className="content-title">ВЕДЬМАК 3: ДИКАЯ ОХОТА</h2>
                <h3 className="content-subtitle">В это издание входят:</h3>

                <div className="content-grid">
                    <div className="content-item main-game">
                        <img src="/orig.webp" alt="Ведьмак 3: Дикая охота" />
                        <p>Ведьмак 3: Дикая охота</p>
                    </div>

                    <div className="content-item expansion">
                        <img src="/hearts.png" alt="Каменные сердца" />
                        <p>Дополнение «Каменные сердца»</p>
                    </div>

                    <div className="content-item expansion">
                        <img src="/blood.jpg" alt="Кровь и вино" />
                        <p>Дополнение «Кровь и вино»</p>
                    </div>

                    <div className="content-item dlc">
                        <div className="dlc-collection">
                            <img src="/16+.jpg" alt="Комплект темерских доспехов" />
                            <img src="/16++.jpg" alt="Снаряжение Школы Волка" />
                            <img src="/16+++.jpg" alt="Пропавшие горняки" />
                            <img src="/166.jpg" alt="Альтернативный облик Йеннифэр" />
                        </div>
                        <p>+ 16 DLCs</p>
                    </div>
                </div>

                <div className="netflix-content">
                    <p>Включает материалы по мотивам сериала «Ведьмак» от Netflix</p>
                </div>

                <button className="close-content-button" onClick={handleToggleContent}>
                    ЗАКРЫТЬ
                </button>
            </div>
        </div>
    );

    return (
        <div className="game-section">
            <div className="game-left">
                <img
                    src="/orrig.webp"
                    alt="Game Hero"
                    className="hero-image"
                />

                <img
                    src="/tw3.png"
                    alt="Legenda"
                    className="legend-image"
                />
            </div>

            <div className="game-right">
                <div className="platform-selector">
                    {!showStores ? renderPlatformButtons() : renderStoreSelection()}

                    {!showStores && (
                        <>
                            <div className="free-update-banner">
                                <div className="update-text">
                                    <span className="update-title">БЕСПЛАТНОЕ ОБНОВЛЕНИЕ</span>
                                    <span className="update-subtitle">ДЛЯ НОВОГО ПОКОЛЕНИЯ</span>
                                </div>
                            </div>

                            <button className="details-button" onClick={handleToggleContent}>
                                <span className="eye-icon"></span>
                                УЗНАТЬ, ЧТО ВНУТРИ
                            </button>

                            <a href="#" className="official-site-button">
                                ОТКРЫТЬ ОФИЦИАЛЬНЫЙ САЙТ
                            </a>
                        </>
                    )}
                </div>
            </div>

            {showContent && renderGameContent()}
        </div>
    );
};

export default GameSection
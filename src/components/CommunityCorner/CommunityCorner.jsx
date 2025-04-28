import React, { useState, useEffect } from 'react';
import './CommunityCorner.css';

const CommunityCorner = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const projects = [
        {
            title: "THE WITCHER SCHOOL QUIZ",
            description: "Пройдите тест и узнайте, к какой школе Ведьмаков вы принадлежите.",
            image: "public/meda.jpg"
        },
        {
            title: "IT'S ALL ABOUT YOU!",
            description: "Поделитесь своими приключениями в мире Ведьмака и выиграйте награды.",
            image: "public/aay.jpg"
        },
        {
            title: "GWENT TOURNAMENT",
            description: "Примите участие в турнире по Гвинту и докажите, что вы лучший игрок во всем Континенте.",
            image: "public/gwent.jpg"
        }
    ];

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    // Показываем все карточки
    const getVisibleProjects = () => {
        return projects;
    };

    return (
        <div className="community-corner-container">
            <div className="logo-container">
                <img src="/public/w3.png" alt="Logo" className="logo" />
            </div>

            <div className="content-wrapper">
                <div className="community-info">
                    <h1 className="community-title">COMMUNITY CORNER</h1>
                    <div className="title-divider">
                        <div className="divider-line"></div>
                        <div className="divider-line"></div>
                    </div>
                    <p className="community-description">
                        Добро пожаловать в Community Corner – ваше главное место для всех общественных
                        проектов CD PROJEKT RED, связанных с миром Ведьмака!
                    </p>
                    <p className="community-subtext">
                        Ниже вы найдете список текущих событий, а также тех, которые уже завершились (но могут вернуться в будущем!).
                        Чтобы узнать больше о конкретном проекте, просто нажмите на соответствующую карточку, чтобы перейти на
                        специальную страницу с подробной информацией.
                    </p>
                </div>

                <div className="projects-wrapper">
                    <div className="community-projects">
                        {getVisibleProjects().map((project, index) => (
                            <div className="project-card" key={index}>
                                <div className="project-badge">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="badge-image"
                                    />
                                </div>
                                <div className="project-info">
                                    <h2 className="badge-title">{project.title}</h2>
                                    <p className="project-description">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityCorner;
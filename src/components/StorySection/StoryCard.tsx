import React from 'react';
import './StoryCard.css';

interface StoryCardProps {
    card: {
        id: string;
        title: string;
        image: string;
        description: string;
    };
    index: number;
    onClick: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ card, index, onClick }) => {
    return (
        <div
            className={`story-card story-card-${index + 1}`}
            onClick={onClick}
        >
            <div className="story-card-image">
                <img src={card.image} alt={card.title} />
            </div>
            <div className="story-card-content">
                <h3 className="story-card-title">{card.title}</h3>
                <div className="story-card-hover-info">
                    <p>{card.description}</p>
                    <span className="story-card-view">View Gallery</span>
                </div>
            </div>
        </div>
    );
};
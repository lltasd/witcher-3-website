interface StoryCardData {
    id: string;
    title: string;
    image: string;
    description: string;
    thumbnails: string[];
    fullDescription?: string;
}

export const storyData: StoryCardData[] = [
    {
        id: 'child-of-prophecy',
        title: 'Child Of Prophecy',
        image: '/story-child-1.jpg',
        description: 'As Geralt, embark on your most perilous and personal journ...',
        fullDescription: 'As Geralt of Rivia, you embark on your most perilous and personal journey yet. The Empire of Nilfgaard has returned, and the Child of Prophecy, Ciri - the living weapon that can alter the shape of the world - has reappeared. In your search, you\'ll confront trauma, loss, and the looming shadow of the Wild Hunt.',
        thumbnails: [
            '/story-child-1.jpg',
            '/child-of.jpg',
            '/ff3.jpg'
        ]
    },
    {
        id: 'romance',
        title: 'Romance',
        image: '/story-romance-1.jpg',
        description: 'Forge deep and meaningful relationships throughout your jou..',
        fullDescription: 'Forge deep and meaningful relationships throughout your journey in the Northern Kingdoms. From passionate romances with powerful sorceresses to complex bonds with allies and foes alike, your choices in relationships will shape your path and the fate of those around you.',
        thumbnails: [
            '/story-romance-1.jpg',
            '/roman.jpg',
            '/roomn.webp'
        ]
    },
    {
        id: 'plague-of-the-wild-hunt',
        title: 'Plague Of The Wild Hunt',
        image: '/huunt.png',
        description: 'Face the terrifying Wild Hunt – a spectral cavalry from another..',
        fullDescription: 'Face the terrifying Wild Hunt – a spectral cavalry from another dimension bent on capturing Ciri for their own dark purposes. Led by the fearsome King of the Wild Hunt, this otherworldly force will stop at nothing to achieve their goals, leaving destruction and suffering in their wake.',
        thumbnails: [
            '/huunt.png',
            '/huun2.jpg',
            '/hunt.jpg'
        ]
    },
    {
        id: 'choice-and-consequence',
        title: 'Choice And Consequence',
        image: '/poosled.jpg',
        description: 'Every decision you make shapes the world around you...',
        fullDescription: 'Every decision you make shapes the world around you in profound ways. From small acts of kindness to kingdom-altering choices, your actions will determine who lives, who dies, and what becomes of the lands of the Northern Realms. No choice is without consequence in this morally ambiguous world.',
        thumbnails: [
            '/poosled.jpg',
            '/posled.jpg',
            '/vibor.jpg'
        ]
    }
];
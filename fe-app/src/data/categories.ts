import type { StayCategory } from '@/types/stay';

export const DEMO_STAY_CATEGORIES: StayCategory[] = [
    {
        id: 1,
        name: 'Hotel',
        href: '/archive-stay/hotel',
        color: 'blue',
        icon: '🏨',
    },
    {
        id: 2,
        name: 'Resort',
        href: '/archive-stay/resort',
        color: 'green',
        icon: '🌴',
    },
    {
        id: 3,
        name: 'Villa',
        href: '/archive-stay/villa',
        color: 'purple',
        icon: '🏡',
    },
    {
        id: 4,
        name: 'Homestay',
        href: '/archive-stay/homestay',
        color: 'yellow',
        icon: '🛏️',
    },
];

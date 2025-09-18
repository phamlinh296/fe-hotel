// listings.ts
import type { StayDataType } from '@/types/stay';

import { DEMO_STAY_CATEGORIES } from '@/data/categories';
// import { DEMO_AUTHORS } from '@/data/authors';

export interface StayApiResponse {
    id: number;
    authorId: number;
    listingCategoryId: number;
    title: string;
    description?: string;
    address: string;
    price: number;
    reviewStart: number;
    reviewCount: number;
    like: boolean;
    saleOff?: string;
    isAds?: boolean;
    galleryImgs: string[];
    featuredImage: string;
    href: string;
    date: string;
    map: { lat: number; lng: number };
    bedrooms: number;
    bathrooms: number;
    commentCount: number;
    viewCount: number;
    maxGuests: number;
}

// ✅ đặt tên rõ ràng là mapper
export function mapStay(post: StayApiResponse, index: number): StayDataType {
    const category =
        DEMO_STAY_CATEGORIES.find((cat) => cat.id === post.listingCategoryId) ||
        DEMO_STAY_CATEGORIES[0];
    // const author =
    //     DEMO_AUTHORS.find((user) => user.id === Number(post.authorId)) ||
    //     DEMO_AUTHORS[0]; // fallback nếu không tìm thấy

    return {
        ...post,
        saleOff: !index ? '-20% today' : post.saleOff,
        isAds: !index ? true : post.isAds,
        // author,
        category,
        description: post.description || 'Chưa có mô tả',
    };
}

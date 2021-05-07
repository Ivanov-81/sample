import { Picture } from "./pictures";

export interface Review {
    tip: {
        id: number,
        icon: string,
        title: string,
        type: string,
        is_commentary: boolean
    },
    caption: string,
    review_id: number,
    identification_id: number,
    tags: Tag[]
}

export interface Tag {
    id: number,
    text: string,
    pictures: Picture[]
}
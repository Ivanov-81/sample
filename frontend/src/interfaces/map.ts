import { Coords } from "google-map-react";

export interface Point {
    name: string;
    address: string;
    coordinates: Coords;
    settings: {
        hours: string;
        distance: number;
        offer: string;
        price: string;
    };
    id: number;
    city: string;
    company: {
        name: string;
        id: number;
    }
    point: string;
}

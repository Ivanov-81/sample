import { Program } from "./programs";
import { Picture } from "./pictures";
import { Point } from "./map";

export interface Company {
    name: string;
    description: string;
    id: number;
    programs: Program[];
    avatar: Picture;
    points: Point[];
}
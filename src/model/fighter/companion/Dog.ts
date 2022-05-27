import { FighterCompanion, FighterStats } from "../../base/Fighter";
import { Bite } from "../../fight/move/Bite";

export class Dog extends FighterCompanion {
    constructor(name: string, stats: FighterStats) {
        super(name, stats, [Bite])
    }
} 
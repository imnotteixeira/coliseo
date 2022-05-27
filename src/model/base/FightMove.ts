import { BaseFighter } from "./Fighter";

export interface FightMove {
    name: string
    power: number,
    source: BaseFighter
}

export interface FightMoveFactory {
    instatiate: (source: BaseFighter) => FightMove
}
import { BaseFighter, SerializableBaseFighter } from "./Fighter";

export interface IFightMove {
    name: string
    power: number,
    source: BaseFighter
    serialize: () => ISerializableFightMove
}

export interface ISerializableFightMove {
    name: string
    power: number,
    source: SerializableBaseFighter
}

export interface FightMoveFactory {
    instatiate: (source: BaseFighter) => FightMove
}

export class FightMove implements IFightMove {
    name: string;
    power: number;
    source: BaseFighter;

    constructor(name: string, power: number, source: BaseFighter) {
        this.name = name;
        this.power = power;
        this.source = source;
    }

    public serialize(): ISerializableFightMove {
        return {
            name: this.name,
            power: this.power,
            source: this.source.serialize()
        }
    }

}
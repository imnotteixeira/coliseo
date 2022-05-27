import { FightMove, FightMoveFactory } from "../../base/FightMove";
import { BaseFighter } from "../../base/Fighter";

class BiteImpl implements FightMove {
    public name = "Bite"
    public source;
    public power;

    public constructor(source: BaseFighter) {
        this.power = source.getStats().attack * 1.3;
        this.source = source;
    }
}

export const Bite: FightMoveFactory = {
    instatiate: (source) => new BiteImpl(source)
}
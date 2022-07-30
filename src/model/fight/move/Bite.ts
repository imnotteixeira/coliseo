import { FightMove, FightMoveFactory } from "../../base/FightMove";
import { BaseFighter } from "../../base/Fighter";

class BiteImpl extends FightMove {
    public constructor(source: BaseFighter) {
        super("Bite", source.getStats().attack * 1.3, source)
    }
}

export const Bite: FightMoveFactory = {
    instatiate: (source) => new BiteImpl(source)
}
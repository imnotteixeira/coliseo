import { FightMoveFactory, FightMove } from "../../base/FightMove";
import { BaseFighter } from "../../base/Fighter";

class PunchImpl extends FightMove {
    public constructor(source: BaseFighter) {
        super("Punch", source.getStats().attack, source)
    }
}

export const Punch: FightMoveFactory = {
    instatiate: (source) => new PunchImpl(source)
}
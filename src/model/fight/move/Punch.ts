import { FightMove, FightMoveFactory } from "../../base/FightMove";
import { BaseFighter } from "../../base/Fighter";

class PunchImpl implements FightMove {
    public name = "Punch"
    public source;
    public power;

    public constructor(source: BaseFighter) {
        this.power = source.getStats().attack;
        this.source = source;
    }
}

export const Punch: FightMoveFactory = {
    instatiate: (source) => new PunchImpl(source)
}
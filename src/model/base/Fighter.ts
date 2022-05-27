import { FightMove, FightMoveFactory } from "./FightMove";

export type FighterStats = {
    attack: number;
    defence: number;
    health: number;
}

export type FighterState = {
    health: number
}

export type Defence = {
    defender: BaseFighter,
    power: number
}

export abstract class BaseFighter {
    public readonly name: string;
    protected readonly stats: FighterStats;
    protected readonly moves: FightMove[];
    protected state: FighterState;
    
    constructor(name: string, stats: FighterStats, moves: FightMoveFactory[]) {
        this.name = name;
        this.stats = stats;
        this.state = { health: stats.health };
        this.moves = moves.map(m => m.instatiate(this));

        console.info(`Hi! I am ${this.name}, and I have moves: ${this.moves.map(m => m.name)}`)
    }

    protected getAttackMoves(): FightMove[] {
        return [] // No attack
    }

    protected calculateRealHitPowerOnDefence(move: FightMove): number {
        return move.power; // No defence
    }

    public getStats(): FighterStats {
        return this.stats;
    }

    getCurrentHP() {
        return this.state.health;
    }

    /** DO NOT OVERRIDE attack(), OVERRIDE getAttackMoves() INSTEAD */
    public attack(): FightMove[] {
        const availableMoves = this.getAttackMoves()

        const moveToExecute = Math.floor(Math.random() * availableMoves.length)
        return [availableMoves[moveToExecute]]
    }

    /** DO NOT OVERRIDE defend(), OVERRIDE calculateRealHitPowerOnDefence() INSTEAD */
    public defend(move: FightMove): Defence {
        const realPower = this.calculateRealHitPowerOnDefence(move)  
        this.setState({health: this.state.health - realPower})
        
        return {
            // TODO: If/When companions defend, this should return the companion instead
            // Also, this method could return Defence[] instead, for when both targets sustain damage (multiple "defences" happen)
            defender: this, 
            power: realPower
        };
    }

    private setState(newState: Partial<FighterState>) {
        this.state = {...this.state, ...newState};
    }

    public isDead(): boolean {
        return this.state.health <= 0
    }
}

export class MainFighter extends BaseFighter {
    private companion: FighterCompanion | undefined;

    constructor(name: string, stats: FighterStats, moves: FightMoveFactory[], companion?: FighterCompanion) {
        super(name, stats, moves);
        this.companion = companion;
    }

    protected override getAttackMoves(): FightMove[] {
        const companionMoves = this.companion?.attack() || []
        return [...companionMoves, ...this.moves];
    }

    protected override calculateRealHitPowerOnDefence(move: FightMove): number {
        // TODO modify this to allow the Companion to defend Main Fighter as well
        return move.power; // No defence
    }

}

export class FighterCompanion extends BaseFighter {

    constructor(name: string, stats: FighterStats, moves: FightMoveFactory[]) {
        super(name, stats, moves)
    }

    protected override getAttackMoves(): FightMove[] {
        return this.moves
    }

    // TODO: To be able to defend
    // protected override calculateRealHitPowerOnDefence(move: FightMove): number {
        
    // }

}
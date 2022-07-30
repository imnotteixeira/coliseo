import { BaseFighter, IDefence, ISerializableDefence } from "../model/base/Fighter";
import { FightMove, IFightMove, ISerializableFightMove } from "../model/base/FightMove";

export type Players = {
    0: BaseFighter
    1: BaseFighter,
}

type PlayerId = 0 | 1;

interface IFight {
    currentPlayer: PlayerId
    players: Players,

    tick: () => FightStepOutcome
}

export type FightSummary = {
    winner: BaseFighter,
    fightHistory: ISerializableFightMoveTrade[]
}

type FightStepOutcome = {
    winner: BaseFighter | undefined,
    hits: IFightMoveTrade[]
}

interface IFightMoveTrade {
    attack: IFightMove,
    defence: IDefence,
    serialize: () => ISerializableFightMoveTrade
}

type ISerializableFightMoveTrade = {
    attack: ISerializableFightMove,
    defence: ISerializableDefence
}

class FightMoveTrade implements IFightMoveTrade {
    
    public attack: FightMove;
    public defence: IDefence;

    constructor(attack: FightMove, defence: IDefence) {
        this.attack = attack;
        this.defence = defence;
    }

    public serialize(): ISerializableFightMoveTrade {
        return {
            attack: this.attack.serialize(),
            defence: this.defence.serialize()
        }
    }
}

class Fight implements IFight {
    currentPlayer: PlayerId = 0;

    public players: Players;
    public fightHistory: FightMoveTrade[];

    constructor(players: Players) {
        this.players = players
        this.fightHistory = []
    }

    public start(): FightSummary {

        let fightWinner = undefined;

        while(!fightWinner) {
            const {winner, hits} = this.tick();
            fightWinner = winner;
            this.fightHistory.push(...hits)
        }

        return {
            winner: fightWinner,
            fightHistory: this.fightHistory.map(trade => trade.serialize())
        }
    }

    public tick(): FightStepOutcome {
        const attackMoves: IFightMove[] = this.players[this.currentPlayer].attack()

        const attacker = this.players[this.currentPlayer];
        const defender = this.getDefendingFighter()
        
        const hits: IFightMoveTrade[] = attackMoves.map((move) => 
            new FightMoveTrade(
                move,
                defender.defend(move)
            )
        );


        if(defender.isDead()) return {
            winner: attacker,
            hits
        }

        this.currentPlayer = this.getDefendingPlayer()
        
        return {
            winner: undefined,
            hits
        };
    }

    private getDefendingFighter(): BaseFighter {
        return this.players[this.getDefendingPlayer()]
    }

    private getDefendingPlayer(): PlayerId {
        return ((this.currentPlayer + 1) % 2) as PlayerId
    }

    public print() {
        this.fightHistory.forEach(({attack, defence}) => {
            console.info(`[${attack.source.name}] Used ${attack.name} with ${attack.power} power`)
            console.info(`[${defence.defender.name}] Took ${defence.power} damage | HP: ${defence.defender.getCurrentHP()}`)
        })
    }
}

export class FightController {
    
    public createFight(players: Players) {
        return new Fight(players)
    }
}

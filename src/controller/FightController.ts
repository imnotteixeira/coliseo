import { BaseFighter, Defence } from "../model/base/Fighter";
import { FightMove } from "../model/base/FightMove";

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
    fightHistory: FightMoveTrade[]
}

type FightStepOutcome = {
    winner: BaseFighter | undefined,
    hits: FightMoveTrade[]
}

type FightMoveTrade = {
    attack: FightMove,
    defence: Defence
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
            fightHistory: this.fightHistory
        }
    }

    public tick(): FightStepOutcome {
        const attackMoves: FightMove[] = this.players[this.currentPlayer].attack()

        const attacker = this.players[this.currentPlayer];
        const defender = this.getDefendingFighter()
        
        const hits = attackMoves.map((move) => ({
            attack: move,
            defence: defender.defend(move)
        }))


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

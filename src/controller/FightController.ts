import { BaseFighter } from "../model/base/Fighter";
import { FightMove } from "../model/base/FightMove";

export type Players = {
    0: BaseFighter
    1: BaseFighter,
}

type PlayerId = 0 | 1;

interface IFight {
    currentPlayer: PlayerId
    players: Players,

    tick: () => BaseFighter | undefined
}

class Fight implements IFight {
    currentPlayer: PlayerId = 0;

    public players: Players;

    constructor(players: Players) {
        this.players = players
    }

    public start(): BaseFighter {

        let matchWinner = undefined;
        while(!matchWinner) {
            matchWinner = this.tick();
        }

        return matchWinner;
    }

    public tick(): BaseFighter | undefined {
        const attackMoves: FightMove[] = this.players[this.currentPlayer].attack()

        const attacker = this.players[this.currentPlayer];
        const defender = this.getDefendingFighter()
        
        const hits = attackMoves.map((move) => {
            console.info(`[${move.source.name}] Used ${move.name} with ${move.power} power`)
            const defence = defender.defend(move)
            console.info(`[${defence.defender.name}] Took ${defence.power} damage | HP: ${defence.defender.getCurrentHP()}`)
        })


        if(defender.isDead()) return attacker;

        this.currentPlayer = this.getDefendingPlayer()
        
        return undefined;
    }

    private getDefendingFighter(): BaseFighter {
        return this.players[this.getDefendingPlayer()]
    }

    private getDefendingPlayer(): PlayerId {
        return ((this.currentPlayer + 1) % 2) as PlayerId
    }

}

export class FightController {
    
    public createFight(players: Players) {
        return new Fight(players)
    }
}

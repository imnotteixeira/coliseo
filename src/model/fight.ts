import { BaseFighter, FightMove } from "./fighter";

export type Players = {
    0: BaseFighter
    1: BaseFighter,
}

type PlayerId = 0 | 1;

export interface IFight {
    currentPlayer: PlayerId
    players: Players,

    tick: () => BaseFighter | undefined
}

export class Fight implements IFight {
    currentPlayer: PlayerId = 0;

    public players: Players;

    constructor(players: Players) {
        this.players = players
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
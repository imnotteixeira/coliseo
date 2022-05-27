import { Fight, Players } from "./model/fight";
import { MainFighter, Dog, Punch } from "./model/fighter";

const players: Players = {
    0: new MainFighter("John", {attack: 1, defence: 2, health: 100}, [Punch], new Dog("Jarvis", {attack: 2, defence: 1, health: 20})),
    1: new MainFighter("Mick", {attack: 1.2, defence: 1.7, health: 90}, [Punch])
}

const fight = new Fight(players)

let matchWinner = undefined;
while(!matchWinner) {
    matchWinner = fight.tick();
}

console.log(`Congratulations, ${matchWinner.name}!`)
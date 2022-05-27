import { FightController, Players } from "./controller/FightController";
import { MainFighter } from "./model/base/Fighter";
import { Punch } from "./model/fight/move/Punch";
import { Dog } from "./model/fighter/companion/Dog";

const players: Players = {
    0: new MainFighter("John", {attack: 1, defence: 2, health: 100}, [Punch], new Dog("Jarvis", {attack: 2, defence: 1, health: 20})),
    1: new MainFighter("Mick", {attack: 1.2, defence: 1.7, health: 90}, [Punch])
}

const fightController = new FightController();
const fight = fightController.createFight(players)

const matchWinner = fight.start();


console.log(`Congratulations, ${matchWinner.name}!`)
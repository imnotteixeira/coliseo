# Coliseo

**Coliseo** is a random turn-based fighting game. Each player is represented by a Fighter which may have different fight moves, weapons and fighting companions!
The catch is that you don't control the fights, you are but a mere watcher hoping for the best...

## Roadmap

> I'll work on this whenever I feel like it, so there won't be any date commitments, but I'll post here the features I'd like this game to have, sorted by priority.

- [ ] Implement a WebUI for the game, where players can watch the fights
  - For this, I intend to use [phaser](https://github.com/photonstorm/phaser) 
- [ ] Implement different weapons, which give the fighters different `move` options
- [ ] Implement a backend to store different players' `Fighters`
- [ ] Implement a multiplayer system which pairs different players looking for a match
- [ ] Implement different companions (that can have different traits - be more defensive, or more attacking, but also fragile)
- [ ] Fighting Dojos
  * Be able to recruit rookie fighters and evolve them as part of the crew
- [ ] Fighting Crews
  - [ ] Ability to fight N x M
    * Perhaps limit N, and limit N/M ratio
- [ ] Player/Fighter Statistics based on fight history
- [ ] Fighter traits
  - `luck` - Increases probability of critical hits
  - `strength` - Increases the base power of the fight moves
  - `agility` - Avoid enemy attacks
  - ...
- [ ] Different Fighter skins

## Concept

* Each player gets a Fighter to start. The fighter will have a set of attributes automatically generated - perhaps the player can set preferences for the best attributes they desire. 
* Each Fighter starts without weapons and can learn moves in a practice arena (vs. bots)
* Players can enter AI tournaments to win coins. They can use these coins to buy Weapons
* Fighters also have a chance of stealing a weapon if they are unarmed and win a fight against a (human) Fighter. The other Fighter will also lose the weapon.
* Players can choose not to have their Fighter fight against unarmed Fighters (to avoid losing their weapons on fight loss)
* Players can also buy companions (or win them if they win tournaments?) to fight alongside them
* Players can recruit Rookie Fighters and evolve them (could they make them fight alongside the main fighter, like fighter companions?). They can also use the Dojos to train them "offline"
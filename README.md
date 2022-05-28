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
- [ ] Fighter traits
  - `luck` - Increases probability of critical hits
  - `strength` - Increases the base power of the fight moves
  - `agility` - Avoid enemy attacks
  - ...
- [ ] Different Fighter skins
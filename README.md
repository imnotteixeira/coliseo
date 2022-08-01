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

## Local Development

`coliseo-web` package (and eventually others) have this package as an npm dependency. This means that, for the changes of this package to reflect on the others you need to publish a new version to npm, and then update the version on the dependents.

This is of course a lot of work and error prone. As such, there is a workaround that lets you see the effects of changes to this package before publishing it: `npm link`.

First, you need to go to the folder of this package and run `npm link`. This will create a symlink of the code to a global npm location on your machine.

Then, for each package you want to be automatically updated with local changes, you must go to its folder, and run `npm link @coliseo/engine`. Every time you run `npm install/uninstall` the link will be broken, and you must re-link the packages.

Keep in mind that this won't probably work correctly when using Docker, since the node_modules folder is not mounted inside the container, therefore this symlink workaround won't work as expected. If you find this blocking your workflow, you can modify the `docker-compose.yml` of the dependent packages (backend or frontend) to mount the `node_modules` folder in a volume only for development.

## Continuous Deployment (CD)
This package will automatically publish new versions to npm whenever there's a push to `main`. (Will also be triggered on PRs, since there is a merge commit pushed to `main`)

This is done with [semantic-release](https://github.com/semantic-release/semantic-release)

It relies on the [conventional commit format](https://conventionalcommits.org/link) so that it can work out the package version increments when publishing updates. 

**IMPORTANT** If you do not follow this convention, the package may fail to be published as the semantic-release won't detect relevant updates.

> From the semantic-release docs:

The table below shows which commit message gets you which release type when semantic-release runs (using the default configuration):

Commit message | Release type
--- | ---
fix(pencil): stop graphite breaking when too much pressure applied |	Patch Release
feat(pencil): add 'graphiteWidth' option | Feature Release
perf(pencil): remove graphiteWidth option<br/><br/>BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reasons. | Breaking Release

When publishing the new version, the `package.json` will automatically be updated as well with the new version, but as this requires a new commit to master, that is done by the `semantic-release-bot`. For this to work correctly, do not restrict push permissions on the `main` branch.

Finally, for this bot to be able to push to the repository, a Github Authentication token (repo) is needed. One was generated and is stored in the secrets of this repo. Whichever account generates this, must have access to the repository, obviously.

### npm

For publishing, an organization called `coliseo` was created. The package is published under this scope (@coliseo/engine) and for that, there is a publish access token used by semantic-release to have permission to publish the package.

In case something stops working, make sure there is an valid access token for publishing (with permissions on coliseo org). That token must be stored as a Github Secret on this repository with the name `NPM_TOKEN`. (For additional instructions, check the semantic-release docs, specially [this](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/getting-started.md#getting-started)).

# Starfinder 2nd Edition Playtest
The official Foundry module for the [Starfinder 2nd edition playtest](https://paizo.com/starfinderplaytest)!

Come discuss this module and Pathfinder 2nd edition on [our discord](https://discord.gg/pf2e).

## Issues and Contributions
Please report any issues or data discrepancies on the [issue tracker](https://github.com/TikaelSol/starfinder-field-test/issues).


In order to make contributions to the module follow these steps. I assume some familiarity with git and node, if you are new to these things see the [PF2e system's contribution guide](https://github.com/foundryvtt/pf2e/wiki/Helping-with-Data-Entry) for a more in depth walkthrough:

1: Create a fork of this repo and clone it

2: Install [NodeJS](https://nodejs.org/) and [Git](https://git-scm.com/download/win) if they are not already

3: Navigate to your cloned repo and run `npm ci`

4: Run `npm run build` to build the module from the source

5: Make sure Foundry is closed, run `npm run link` then enter the path to your Foundry user data folder (It will look something like this on Windows `C:\Users\YourUsername\AppData\Local\FoundryVTT\Data`). This will delete any existing sf2e folder you have, but will create a symlink between your cloned repo and the Foundry module

6: Make changes inside Foundry, then close Foundry

7: Run `npm run extractPacks` to extract all the changes you made

9: Commit and push, then create a PR

## Having a problem with compendiums not appearing correctly?
If you previously had this module enabled in a world during the Field Test Foundry stored the folder configuration for the module. This can be cleared by running this script from console (F12 on most browsers).
```js
const cc = game.settings.get('core', 'compendiumConfiguration');
const myModule = game.modules.get("starfinder-field-test-for-pf2e");

for (const pack of myModule.packs) {
  cc[pack.id] = null;
}
game.settings.set('core', 'compendiumConfiguration', cc)
```
This will put all the module's compendiums out of their current folders, but nothing will be deleted. After running the script close Foundry fully (stop the server), then relaunch Foundry. This will let the module use its new folder configuration. If you are using a new world you should not encounter this problem.

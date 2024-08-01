# Starfinder 2nd Edition Playtest
The official Foundry module for the [Starfinder 2nd edition playtest](https://paizo.com/starfinderplaytest)!

Come discuss this module and Pathfinder 2nd edition on [our discord](https://discord.gg/pf2e).

## Issues and Contributions
Please report any issues or data discrepancies on the [issue tracker](https://github.com/TikaelSol/starfinder-field-test/issues), the module will be updated to support contributions through the use of [Foundry CLI](https://github.com/foundryvtt/foundryvtt-cli) soon.


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
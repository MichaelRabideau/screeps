var spawnCode = require('spawn');
var utils = require('utils');
var roleTower = require('role.tower');
var room1Spawn = require('room1Spawn');
var room2Spawn = require('room2Spawn');

module.exports.loop = function () {
    
    utils.extendClasses();
    var actFuncs = utils.buildActFuncs();
    
    // Always place this memory cleaning code at the very top of your main loop!

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            Memory.needSpawns = true;
        }
    }
    
    PathFinder.use(true);

    if(Game.cpu.bucket >= 100 )
    {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            //creep.say(creep.memory.role);
            actFuncs[creep.memory.role](creep);
        }
    }
    roleTower.run();
    var link1 = Game.getObjectById('5786e9d39aab5859475b302d');
    var link2 = Game.getObjectById('5786f27a7271ec6319f355b1');
    if(link1.energy == link1.energyCapacity)
        link1.transferEnergy(link2);
        
    room1Spawn.run();
    room2Spawn.run();
    Memory.spawnFlag = spawnCode.run();
    
}
var roleHarvester = require('role.harvester');
var roleRepair = require('role.repair');
var spawnCode = require('spawn');
var roleHunterKiller = require("role.hunterKiller");
var utils = require('utils');
var roleWorker = require('role.worker');
var roleRunner = require('role.runner');
var roleSpecialHarvester = require('role.specialHarvester');
var roleTower = require('role.tower');
var roleReloader = require('role.reloader');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairRoad = require('role.repairRoad');
var roleRepairStructures = require('role.repairStructures');
var roleDemolisher = require('role.demolisher');
var roleClaimer = require('role.claimer');
var rolePioneer = require('role.pioneer');
var roleGeneralHarvester = require('role.generalHarvester');
var room1Spawn = require('room1Spawn');
var room2Spawn = require('room2Spawn');

module.exports.loop = function () {
    
    utils.extendClasses();
    
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
            if(creep.memory.role == 'harvester')
                roleHarvester.run(creep);
            else if(creep.memory.role == 'upgrader')
              roleUpgrader.run(creep);
            else if(creep.memory.role == 'reloader')
              roleReloader.run(creep);
            else if(creep.memory.role == 'runner')
                roleRunner.run(creep);
            else if(creep.memory.role == 'repairRoad')
              roleRepairRoad.run(creep);
            else if(creep.memory.role == 'builder')
              roleBuilder.run(creep);
            else if(creep.memory.role == 'repairStructures')
              roleRepairStructures.run(creep)
            else if(creep.memory.role == 'repair')
              roleRepair.run(creep);
            else if(creep.memory.role == 'hunterKiller')
                roleHunterKiller.run(creep);
            else if(creep.memory.role == 'specialHarvester')
                roleSpecialHarvester.run(creep);
            else if( creep.memory.role == 'demolisher')
                roleDemolisher.run(creep);
            else if( creep.memory.role == 'claimer')
                roleClaimer.run(creep);
            else if( creep.memory.role == 'pioneer')
                rolePioneer.run(creep);
            else if( creep.memory.role == 'generalHarvester')
                roleGeneralHarvester.run(creep);
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
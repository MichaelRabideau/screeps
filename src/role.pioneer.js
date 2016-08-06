var utils = require('utils');

var path = ["E49S44","E49S43"];

var rolePioneer = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
        var buildTarg = function(targ)
        {
            if(creep.build(targ) == ERR_NOT_IN_RANGE)
                    creep.moveEfficiently(targ);
        }
        
        if(creep.room.name != path[path.length - 1])
        {
          creep.memory.destReached = utils.followPath(creep, path);
          return;
        }
    
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
        }
        if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.delivering = true;
        }
        
        if(!creep.memory.delivering) {
            var sources = creep.room.find(FIND_SOURCES);
            var chosenTarget = creep.pos.findClosestByRange(sources)
            if(creep.harvest(chosenTarget) == ERR_NOT_IN_RANGE) {
                creep.moveEfficiently(chosenTarget);
            }
        }
        else {
        
            /*try
            {
              var controller = creep.room.controller;
              if(controller.ticksToDowngrade < 1500 )
              {
                if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                  creep.moveEfficiently(creep.room.controller);
                return;
              }
            } catch(e){} */
      
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var priorityTargets = _.filter( targets, (site) => site.structureType == STRUCTURE_ROAD);
            if(priorityTargets.length){
                buildTarg(priorityTargets[0]);
            }
            else if(targets.length) {
                buildTarg(targets[0]);
            }
            else
            {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveEfficiently(creep.room.controller);
                }
            }
        }
    }
};

module.exports = rolePioneer;
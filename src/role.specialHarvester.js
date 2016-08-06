var utils = require('utils');
  var MAX_TRAVEL = 15;
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
        }
        if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.delivering = true;
        }
        
        if(!creep.memory.delivering) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveEfficiently(sources[0]);
            }
        }
        else {
          var targets = utils.findStructures(creep, [STRUCTURE_EXTENSION],
            function(str){return str.energy < str.energyCapacity &&
            creep.pos.getRangeTo(str) <= Memory.MAX_TRAVEL;});
          if(targets.length > 0)
          {
             var chosenTarget = creep.pos.findClosestByRange(targets)
                if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveEfficiently(chosenTarget);
              return;
          }
          var link = Game.getObjectById('5786e9d39aab5859475b302d');
          if(link && link.energy < link.energyCapacity)
          {
            if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                  creep.moveEfficiently(link);
            return;
          }
         targets = utils.findStructures(creep, [STRUCTURE_CONTAINER], 
          function(str){return str.store[RESOURCE_ENERGY] < str.storeCapacity;});
            if( targets.length > 0)
            {
              var chosenTarget = creep.pos.findClosestByRange(targets)
                //var chosenTarget = targets[0];
              if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveEfficiently(chosenTarget);
              } 
            }
            else
            {
              //??? 
              //profit
            }
        }
    }
};

module.exports = roleHarvester;
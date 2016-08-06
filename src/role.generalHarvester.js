var utils = require('utils');
  var MAX_TRAVEL = 15;
  
var harvest = function(creep, src)
{
  if(creep.harvest(src) == ERR_NOT_IN_RANGE)
    creep.moveEfficiently(src);
}

var chooseSource = function(creep)
{
  var sources = creep.room.find(FIND_SOURCES);
  var gHarvesters = creep.room.find(FIND_CREEPS, function(crp){return crp.memory.role == "generalHarvester";});
  var sourceCounts = new Object();
  for(var i in sources)
    sourceCounts[sources[i].id] = 0;
  for(var i in gHarvesters)
    sourceCounts[gHarvesters[i].memory.mySource] ++;
  var leastSource = sources[0].id;
  for(var i in sourceCounts)
  {
    if(sourceCounts[i] < sourceCounts[leastSource])
      leastSource = i;
  }
  return leastSource;
}

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
          creep.memory.workTarget = null;
          if(creep.memory.mySource)
          {
            harvest(creep, Game.getObjectById(creep.memory.mySource));
          }
          else
          {
            creep.memory.mySource = chooseSource(creep);
            harvest(creep, Game.getObjectById(creep.memory.mySource));
          }
        }
        else {
          var targets = utils.findStructures(creep, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN],
            function(str){return str.energy < str.energyCapacity &&
            creep.pos.getRangeTo(str) <= MAX_TRAVEL;});
          if(targets.length > 0)
          {
             var chosenTarget = creep.pos.findClosestByRange(targets)
                if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveEfficiently(chosenTarget);
              return;
          }
          /*var link = Game.getObjectById('5786e9d39aab5859475b302d');
          if(link && link.energy < link.energyCapacity)
          {
            if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                  creep.moveEfficiently(link);
            return;
          }*/
          if(creep.memory.workTarget)
          {
            var chosenTarget = Game.getObjectbyId(creep.memory.workTarget);
            var result = creep.transfer(chosenTarget, RESOURCE_ENERGY);
            if(result == ERR_NOT_IN_RANGE) {
                creep.moveEfficiently(chosenTarget);
            } 
            else if(result == ERR_FULL || result == OK)
            {
              creep.memory.workTarget = null;
            }
          }
          else
          {
             targets = utils.findStructures(creep, [STRUCTURE_CONTAINER, STRUCTURE_STORAGE], 
              function(str){return str.store[RESOURCE_ENERGY] < str.storeCapacity;});
                if( targets.length > 0)
                {
                  var chosenTarget = creep.pos.findClosestByRange(targets)
                  creep.memory.workTarget = chosenTarget.id;
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
    }
};

module.exports = roleHarvester;
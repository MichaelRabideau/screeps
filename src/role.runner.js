var utils = require('utils');

var lowest = function(targets)
  {
    var curLowest = null;
    for(var st in targets)
    {
      if(curLowest == null)
        curLowest = targets[st];
      else
        {
          if(_.sum(curLowest.store) > _.sum(targets[st].store))
            curLowest = targets[st];
        }
    }
    return curLowest;
  }
  
  var greatest = function(targets)
  {
    var curGreatest = null;
    for(var st in targets)
    {
      if(curGreatest == null)
        curGreatest = targets[st];
      else
        {
          if(_.sum(curGreatest.store) < _.sum(targets[st].store))
            curGreatest = targets[st];
        }
    }
    return curGreatest;
  }

var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
        if(creep.memory.delivering && creep.carry.energy == 0) {
            creep.memory.delivering = false;
        }
        if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.delivering = true;
        }
            
        var targets = utils.findStructures(creep, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER], 
          function(str){return str.energy < str.energyCapacity;});

        if(!creep.memory.delivering) {
            if(targets.length > 0)
            {
              utils.collectFromStructures(creep);
            }
            else
            {
              //gather from greatest container
              if(creep.memory.greatestEnergyContainer)
                utils.collectFromTarget(creep, Game.getObjectById(creep.memory.closestEnergyContainer))
              else
              {
                var containers = utils.getContainers(creep);
                var chosenTarget = greatest(containers);
                if(chosenTarget)
                {
                  creep.memory.greatestEnergyContainer = chosenTarget.id;
                  utils.collectFromTarget(creep, chosenTarget);
                }
              }
            }
        }
        else {
            if(targets.length > 0) {
                var chosenTarget = creep.pos.findClosestByRange(targets)
                if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveEfficiently(chosenTarget);
                }
            }
            else
            {
              if(!creep.memory.fillTarget)
              {
                targets = utils.findStructures(creep, [STRUCTURE_CONTAINER, STRUCTURE_STORAGE], 
                  function(str){return (_.sum(str.store) < str.storeCapacity) && str.id != 
                  creep.memory.greatestEnergyContainer;});
                if( targets.length > 0)
                {
                  creep.memory.greatestEnergyContainer = null;
                  var chosenTarget = lowest(targets);
                  creep.memory.fillTarget = chosenTarget.id;
                  if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveEfficiently(chosenTarget);
                  } 
                }
                else
                  creep.moveEfficiently(Game.flags['HarvesterRally']);
              }
              else
              {
                var chosenTarget = Game.getObjectById(creep.memory.fillTarget);
                var result = creep.transfer(chosenTarget, RESOURCE_ENERGY);
                if(result == ERR_NOT_IN_RANGE)
                      creep.moveEfficiently(chosenTarget);
                else if(result == OK || _.sum(chosenTarget.store) == chosenTarget.storeCapacity)
                  creep.memory.fillTarget = null;
              }
            }
        }
    }
};

module.exports = roleRunner;
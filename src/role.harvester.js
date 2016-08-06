
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
          var someSource;
            if(creep.memory.mySource)
              someSource = Game.getObjectById(creep.memory.mySource);
            else
            {
              var sources = creep.room.find(FIND_SOURCES);
              //someSource = sources[1];
			  someSource = creep.pos.findClosestByRange(sources);
            }
            if(creep.harvest(someSource) == ERR_NOT_IN_RANGE) {
                creep.moveEfficiently(someSource);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ) && 
                                structure.energy < structure.energyCapacity &&
                                creep.pos.getRangeTo(structure) <= MAX_TRAVEL;
                    }
            });
            if(targets.length > 0) {
                var chosenTarget = creep.pos.findClosestByRange(targets)
                //var chosenTarget = targets[0];
                if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveEfficiently(chosenTarget);
                }
            }
            else
            {
             targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity);}});
              if( targets.length > 0)
              {
                var chosenTarget = creep.pos.findClosestByRange(targets)
                  //var chosenTarget = targets[0];
                if(creep.transfer(chosenTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveEfficiently(chosenTarget);
                } 
              }
              else
                creep.moveEfficiently(Game.flags['HarvesterRally']);
            }
        }
    }
};

module.exports = roleHarvester;
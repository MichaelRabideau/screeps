//I put this in role.repair

var utils = require('utils');
var roleWorker = require('role.worker');
//Game.getObjectById
var weakest = function(structures)
{
  var curWeakest = null;
  for(var st in structures)
  {
    if(curWeakest == null)
      curWeakest = structures[st];
    else
      {
        //if(curWeakest.hits/curWeakest.hitsMax > structures[st].hits / structures[st].hitsMax)
        //  curWeakest = structures[st];
        if(curWeakest.hits > structures[st].hits)
          curWeakest = structures[st];
      }
  }
  return curWeakest;
}

var repairIt = function(creep)
{
  if(creep.repair(Game.getObjectById(creep.memory.repairTarget)) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.getObjectById(creep.memory.repairTarget));
}

var roleRepairRoad = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
        var workNow = roleWorker.run(creep);
        if(!workNow)
          return;
        
        var targo = Game.getObjectById(creep.memory.repairTarget);
        if( targo && targo.hits == targo.hitsMax)
        {
            creep.memory.repairTarget = null;
        }
        if(!creep.memory.repairTarget)
        {
          var damagedStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_WALL ||
              structure.structureType == STRUCTURE_RAMPART ) && 
            structure.hits < structure.hitsMax });
          if( damagedStructures.length )
          {
            var actualTarget = weakest(damagedStructures);
            creep.memory.repairTarget = actualTarget.id;
            repairIt(creep);
          }
          else
          {
            //No damaged structures. Go to rally point?
          }
        }
        else
        {
          repairIt(creep);
        }
    }
};

module.exports = roleRepairRoad;
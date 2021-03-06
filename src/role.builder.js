var utils = require('utils');
var roleWorker = require('role.worker');

var buildTarg = function(creep, targ)
{
    var result = creep.build(targ);
    if(result == ERR_NOT_IN_RANGE)
        creep.moveEfficiently(targ);
    else if( result == ERR_INVALID_TARGET)
        creep.memory.workTarget = null;
}

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var workNow = roleWorker.run(creep);
        if(!workNow)
        {
          creep.memory.workTarget = null;
          return;
        }
        
        if(creep.memory.workTarget)
        {
          buildTarg(creep, Game.getObjectById(creep.memory.workTarget));
        }
        else
        {
          var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
          var priorityTargets = _.filter(targets, (site) => site.structureType == STRUCTURE_ROAD);
          if(priorityTargets.length){
              creep.memory.workTarget = priorityTargets[0].id;
              buildTarg(creep, priorityTargets[0]);
          }
          else if(targets.length) {
              creep.memory.workTarget = targets[0].id;
              buildTarg(creep, targets[0]);
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

module.exports = roleBuilder;
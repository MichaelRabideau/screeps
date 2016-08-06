var utils = require('utils');
var roleWorker = require('role.worker');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var workNow = roleWorker.run(creep);
        if(!workNow)
          return;
        
        var buildTarg = function(targ)
        {
            if(creep.build(targ) == ERR_NOT_IN_RANGE)
                    creep.moveEfficiently(targ);
        }
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
};

module.exports = roleBuilder;
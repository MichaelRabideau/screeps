var utils = require('utils');
var roleRunner = require('role.runner');
var roleWorker = require('role.worker');

var roleReloader = {
    

    /** @param {Creep} creep **/
    run: function(creep) {
      var workNow = roleWorker.run(creep);
      if(!workNow)
        return;
    
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ( structure.structureType == STRUCTURE_TOWER) 
            && structure.energy < structure.energyCapacity;}});
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      else
      {
        roleRunner.run(creep);
      }
    }
};

module.exports = roleReloader;
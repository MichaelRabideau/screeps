var utils = require('utils');

var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
          return true;
        }
        else {
          utils.collectFromStructures(creep);
          return false;
        }
    }
};

module.exports = roleWorker;
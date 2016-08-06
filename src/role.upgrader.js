var utils = require('utils');
var roleWorker = require('role.worker');

var roleUpgrader = {
    

  /** @param {Creep} creep **/
  run: function(creep) {
    var workNow = roleWorker.run(creep);
    if(!workNow)
      return;
  
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveEfficiently(creep.room.controller);
    }
  }
};

module.exports = roleUpgrader;
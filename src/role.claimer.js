var utils = require('utils');
var path = ["E48S44","E49S44"];
var claimTargets = ["577b94880f9d51615fa49b22"];

var roleClaimer = {
  run: function(creep)
    {
      if(!creep.memory.destReached)
      {
        creep.memory.destReached = utils.followPath(creep, path);
        return;
      }
      for(var i in claimTargets)
      {
        var obj = Game.getObjectById(claimTargets[i]);
        if(obj)
        {
          if(creep.claimController(obj) == ERR_NOT_IN_RANGE)
            creep.moveEfficiently(obj);
          return;
        }
      }
    }
};

module.exports = roleClaimer;
var utils = require('utils');
//var path = ["E48S44","E49S44","E49S43","E48S43"];
//var path = ["E48S44","E49S44"];
var path = ["E48S44","E49S44","E49S43","E49S42","E48S42"];
var demoTargets = ["57806f76fa0e21ad39a0ff9f"];

var roleDemolisher = {
  run: function(creep)
    {
      if(!creep.memory.destReached)
      {
        creep.memory.destReached = utils.followPath(creep, path);
        return;
      }
      for(var i in demoTargets)
      {
        var obj = Game.getObjectById(demoTargets[i]);
        if(obj)
        {
          if(creep.dismantle(obj) == ERR_NOT_IN_RANGE)
            creep.moveTo(obj);
          return;
        }
      }
    }
};

module.exports = roleDemolisher;
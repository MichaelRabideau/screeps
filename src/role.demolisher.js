var utils = require('utils');
var path = ["E48S44","E49S44","E49S43","E50S43","E50S42","E50S41","E50S40","E49S40","E48S40","E47S40","E47S41","E47S42"];
//var path = ["E48S44","E49S44"];
var demoTargets = ["57a0652b393e5c8511322e4e", "57a0ea12e071d74321872824", "579f636801b7d22d76d6af90"];

var roleDemolisher = {
  run: function(creep)
    {
      if(!Memory.attackNow)
      {
        creep.moveEfficiently(Game.flags['attackRally']);
        return;
      }
    
      //if(!creep.memory.destReached)
      if(creep.room.name != path[path.length - 1])
      {
        //creep.memory.destReached = utils.followPath(creep, path);
        utils.followPath(creep, path);
        return;
      }
      for(var i in demoTargets)
      {
        var obj = Game.getObjectById(demoTargets[i]);
        if(obj)
        {
          if(creep.dismantle(obj) == ERR_NOT_IN_RANGE)
            creep.moveEfficiently(obj);
          return;
        }
      }
      //If we havn't returned yet... Destroy everything in sight
      var hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);
      if(hostileStructures.length > 0)
      {
        var closest = creep.pos.findClosestByRange(hostileStructures)
        if(creep.dismantle(closest) == ERR_NOT_IN_RANGE)
            creep.moveEfficiently(closest);
      }
    }
};

module.exports = roleDemolisher;
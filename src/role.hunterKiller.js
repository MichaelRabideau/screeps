utils = require('utils');
var dest = 'E49S44';
var path = ["E48S44","E49S44","E49S43","E50S43","E50S42","E50S41","E50S40","E49S40","E48S40","E47S40","E47S41","E47S42"];
var demoTargets = ["57a0652b393e5c8511322e4e", "57a0ea12e071d74321872824", "579f636801b7d22d76d6af90"];

var roleHunter = {
    run: function(creep)
    {
      try{
        if(!Memory.attackNow)
        {
          creep.moveEfficiently(Game.flags['attackRally']);
          return;
        }
        var hostiles = utils.roomHostiles(creep.room);
        var closest = creep.pos.findClosestByRange(hostiles)
        if(closest && creep.pos.getRangeTo(closest) < 10)
        {
          var result = creep.rangedAttack(closest);
          if(result == ERR_NOT_IN_RANGE)
          {
            result = creep.moveEfficiently(closest);
            if(result == ERR_NO_PATH)
            {
              for(var i in demoTargets)
              {
                var obj = Game.getObjectById(demoTargets[i]);
                if(obj)
                {
                  if(creep.rangedAttack(obj) == ERR_NOT_IN_RANGE)
                    creep.moveEfficiently(obj);
                  return;
                }
              }
            }
            else
              return;
          }
          else
            return
        }
        else
        {
          for(var i in demoTargets)
          {
            var obj = Game.getObjectById(demoTargets[i]);
            if(obj)
            {
              if(creep.rangedAttack(obj) == ERR_NOT_IN_RANGE)
                creep.moveEfficiently(obj);
              return;
            }
          }
        }
      }
      catch(e)
      {
        console.log(e);
      }
  }
};

module.exports = roleHunter;
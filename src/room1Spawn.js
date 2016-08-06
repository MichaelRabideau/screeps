var spawn = require('spawn');
/*array of order structures.

order:
desiredCount
role
room
bodyParts
additionalArgs*/

var myRoom = "E48S44";
var room1 = {
    
  run: function() {
  
    if(!Memory.spawnOrders)
      Memory.spawnOrders = new Object();
    if(!Memory.spawnOrders.room1)
      Memory.spawnOrders.room1 = new Object();
    if(!Memory.spawn1Built)
    {
      var orderArray = new Object();
      orderArray.harvester = new spawn.createOrder({role: "harvester", mySource: "577b94770f9d51615fa499de"}, 
        3, myRoom, [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]);
      orderArray.upgrader = new spawn.createOrder({role: "upgrader"}, 
        1, myRoom, [WORK,CARRY,MOVE]);
      orderArray.builder = new spawn.createOrder({role: "builder"}, 
        0, myRoom, [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]);
      orderArray.repair = new spawn.createOrder({role: "repair"}, 
        1, myRoom, [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]);
      orderArray.hunterKiller = new spawn.createOrder({role: "hunterKiller", staticCreep: true}, 
        0, myRoom, [ATTACK,ATTACK,ATTACK,TOUGH,MOVE,MOVE]);
      orderArray.repairRaod = new spawn.createOrder({role: "repairRoad"}, 
        1, myRoom, [WORK,CARRY,MOVE,MOVE]);
      orderArray.repairStructures = new spawn.createOrder({role: "repairStructures"}, 
        1, myRoom, [WORK,CARRY,MOVE,MOVE]);
      orderArray.runner = new spawn.createOrder({role: "runner"}, 
        1, myRoom, [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]);
      orderArray.specialHarvester = new spawn.createOrder({role: "specialHarvester", mySource: "577b94770f9d51615fa499dc"}, 
        1, myRoom, [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]);
      orderArray.reloader = new spawn.createOrder({role: "reloader"}, 
        0, myRoom, [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]);
      orderArray.demolisher = new spawn.createOrder({role: "demolisher", staticCreep: true}, 
        /*0, myRoom, [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK]);*/
        0, myRoom, [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK]);
      orderArray.claimer = new spawn.createOrder({role: "claimer", staticCreep: true}, 
        0, myRoom, [MOVE,CLAIM]);
      orderArray.pioneer = new spawn.createOrder({role: "pioneer", staticCreep: true}, 
        0, myRoom, [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,WORK,WORK]);
      
      Memory.spawnOrders.room1 = orderArray;  //Set all this junk to memory
      Memory.spawn1Built = true;
      Memory.needSpawns = true;
    }
  }
};

module.exports = room1;

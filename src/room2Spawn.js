var spawn = require('spawn');

var myRoom = "E49S44";
var room2 = {
    
  run: function() {
  
    if(!Memory.spawnOrders)
      Memory.spawnOrders = new Object();
    if(!Memory.spawnOrders.room2)
      Memory.spawnOrders.room2 = new Object();
    if(!Memory.spawn2Built)
    {
      var orderArray = new Object();
      orderArray.harvester = new spawn.createOrder({role: "harvester", mySource: "577b94880f9d51615fa49b21"}, 
        0, myRoom, [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]);
      orderArray.generalHarvester = new spawn.createOrder({role: "generalHarvester"}, 
        4, myRoom, [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]);
      orderArray.upgrader = new spawn.createOrder({role: "upgrader"}, 
        1, myRoom, [WORK,CARRY,MOVE]);
      orderArray.runner = new spawn.createOrder({role: "runner"}, 
        2, myRoom, [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]);
      orderArray.builder = new spawn.createOrder({role: "builder"}, 
        1, myRoom, [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]);
      orderArray.repair = new spawn.createOrder({role: "repair"}, 
        1, myRoom, [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]);
      orderArray.hunterKiller = new spawn.createOrder({role: "hunterKiller", staticCreep: true}, 
        0, myRoom, [MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK]);
      orderArray.repairRaod = new spawn.createOrder({role: "repairRoad"}, 
        1, myRoom, [WORK,CARRY,MOVE,MOVE]);
      orderArray.repairStructures = new spawn.createOrder({role: "repairStructures"}, 
        1, myRoom, [WORK,CARRY,MOVE,MOVE]);
      orderArray.specialHarvester = new spawn.createOrder({role: "specialHarvester", mySource: "577b94770f9d51615fa499dc"}, 
        0, myRoom, [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]);
      orderArray.reloader = new spawn.createOrder({role: "reloader"}, 
        0, myRoom, [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]);
      orderArray.demolisher = new spawn.createOrder({role: "demolisher", staticCreep: true}, 
        0, myRoom, [MOVE,MOVE,WORK,WORK]);
      orderArray.claimer = new spawn.createOrder({role: "claimer", staticCreep: true}, 
        0, myRoom, [MOVE,CLAIM]);
      orderArray.pioneer = new spawn.createOrder({role: "pioneer", staticCreep: true}, 
        0, myRoom, [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,WORK,WORK]);
      
      Memory.spawnOrders.room2 = orderArray;  //Set all this junk to memory
      Memory.spawn2Built = true;
      Memory.needSpawns = true;
    }
  }
};

module.exports = room2;

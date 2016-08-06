var utils = require('utils');

var createOrderExport = function(initMemory, orderCount, room, bodyParts)
{
  this.initMemory = initMemory;
  this.count = orderCount;
  this.room = room;
  this.bodyParts = bodyParts;
}

var create = function(listo, count, arr, typeo, spawners)
{
    //console.log(typeo + ": " + listo.length + " < " + count);
    if(listo.length < count) {
      //console.log("true");
        var spawnResult = Game.spawns.spawn1.canCreateCreep(arr);
        if(spawnResult == OK)
        {
            var newName = Game.spawns.spawn1.createCreep(arr, undefined, {role: typeo});
            console.log('Spawning new ' + typeo + ": " + newName);
            //return Memory.spawnFlag;
            return true;
        }
        else
        {
            if(spawnResult==ERR_NOT_ENOUGH_ENERGY)
                return true;
            else
            {
                console.log("Can't spawn: " + spawnResult);
                //return Memory.spawnFlag;
                return true;
            }
        }
    }
    return false;
}

var fillOrder = function(order, room, creepList)
{
  //Call create. return false if no spawn is needed
  var spawners = room.find(FIND_MY_SPAWNS);
  var desired = order.count;
  var actual = creepList.length;
  var spawned = false;
  var spawnResult;
  if(actual >= desired)
    return false;
  for(spawn in spawners)
  {
    if(!spawned)
    {
      spawnResult = spawners[spawn].canCreateCreep(order.bodyParts);
      if(spawnResult == OK)
      {
        var newName = spawners[spawn].createCreep(order.bodyParts, undefined, order.initMemory);
        console.log('Spawning new ' + order.initMemory.role + ": " + newName);
        spawned = true;
      }
    }
    else
    {
      spawnResult = spawners[spawn].canCreateCreep([WORK,CARRY,MOVE]);
      if(spawnResult == OK)
        return false;
    }
  }
  return true;
}

var spawnRoomCreeps = function(roomOrders, staticCreeps)
{
  //param: roomOrders: orders for one entire room
  //We're not looping through rooms here. Only want to deal with one specific room. But
  //it must be set in the loop.
  var room; 
  var roomCreeps;
  var roomObj;
  for( var order in roomOrders)
  {
    if(!room)                         //Set the room and have it persist through each iteration)
    {
      room = roomOrders[order].room;
      roomObj = Game.rooms[room];
      roomCreeps = roomObj.find(FIND_MY_CREEPS);
      if(roomCreeps.length == 0)  //If all the creeps are dead, spawn a simple harvester and return
      {
        fillOrder( createOrderExport({role: "harvester"}, 1, room, [WORK,CARRY,MOVE]), roomObj,[]);
        return true;
      }
      roomCreeps.concat(staticCreeps);  //Concatenate the "static" creeps - creeps that can move to different rooms.
    }
    creepResult = utils.splitList(roomCreeps, function(creep){return creep.memory.role == 
      roomOrders[order].initMemory.role;});
    if( fillOrder(roomOrders[order], roomObj, creepResult[0]) )
      return true;
    roomCreeps = creepResult[1];
  }
  return false;
}

var spawnCode = {
  run: function()
  {
    var staticCreeps = _(Game.creeps).filter(function(creep){return Boolean(creep.Memory.staticCreep);});
     for(var room in Memory.spawnOrders)
     {
      var curRoom = Memory.spawnOrders[room];
      spawnRoomCreeps(curRoom, staticCreeps);
     }
  },
  createOrder: createOrderExport
};

module.exports = spawnCode;
var utils = require('utils');

var createOrderExport = function(initMemory, orderCount, room, bodyParts)
{
  this.initMemory = initMemory;
  this.count = orderCount;
  this.room = room;
  this.bodyParts = bodyParts;
}

var create = function(listo, count, arr, typeo, spawners)
{
    //console.log(typeo + ": " + listo.length + " < " + count);
    if(listo.length < count) {
      //console.log("true");
        var spawnResult = Game.spawns.spawn1.canCreateCreep(arr);
        if(spawnResult == OK)
        {
            var newName = Game.spawns.spawn1.createCreep(arr, undefined, {role: typeo});
            console.log('Spawning new ' + typeo + ": " + newName);
            //return Memory.spawnFlag;
            return true;
        }
        else
        {
            if(spawnResult==ERR_NOT_ENOUGH_ENERGY)
                return true;
            else
            {
                console.log("Can't spawn: " + spawnResult);
                //return Memory.spawnFlag;
                return true;
            }
        }
    }
    return false;
}

var fillOrder = function(order, room, creepList)
{
  //Call create. return false if no spawn is needed
  var spawners = room.find(FIND_MY_SPAWNS);
  var desired = order.count;
  var actual = creepList.length;
  var spawned = false;
  var spawnResult;
  if(actual >= desired)
    return false;
  for(spawn in spawners)
  {
    if(!spawned)
    {
      spawnResult = spawners[spawn].canCreateCreep(order.bodyParts);
      if(spawnResult == OK)
      {
        var newName = spawners[spawn].createCreep(order.bodyParts, undefined, order.initMemory);
        console.log('Spawning new ' + order.initMemory.role + ": " + newName);
        spawned = true;
      }
    }
    else
    {
      spawnResult = spawners[spawn].canCreateCreep([WORK,CARRY,MOVE]);
      if(spawnResult == OK)
        return false;
    }
  }
  return true;
}

var spawnRoomCreeps = function(roomOrders, staticCreeps)
{
  //param: roomOrders: orders for one entire room
  //We're not looping through rooms here. Only want to deal with one specific room. But
  //it must be set in the loop.
  var room; 
  var roomCreeps;
  var roomObj;
  
  for( var order in roomOrders)
  {
    if(!room)                         //Set the room and have it persist through each iteration)
    {
      room = roomOrders[order].room;
      roomObj = Game.rooms[room];
      roomCreeps = roomObj.find(FIND_MY_CREEPS, {
        filter: function(crp) { return !crp.memory.staticCreep; } });
      if(roomCreeps.length == 0)  //If all the creeps are dead, spawn a simple harvester and return
      {
        fillOrder( createOrderExport({role: "harvester"}, 1, room, [WORK,CARRY,MOVE]), roomObj,[]);
        return true;
      }
      roomCreeps = roomCreeps.concat(staticCreeps);  //Concatenate the "static" creeps - creeps that can move to different rooms.
    }
    creepResult = utils.splitList(roomCreeps, function(creep){return creep.memory.role == 
      roomOrders[order].initMemory.role;});
    if( fillOrder(roomOrders[order], roomObj, creepResult[0]) )
      return true;
    roomCreeps = creepResult[1];
  }
  return false;
}

var spawnCode = {
  run: function()
  {
    //var staticCreeps = _(Game.creeps).filter(function(creep){return Boolean(creep.memory.staticCreep);});
    
    if(!Memory.needSpawns)
      return;
    Memory.needSpawns = false;
    var staticCreeps = [];
    for(var crp in Game.creeps)
    {
      if(Game.creeps[crp].memory.staticCreep)
        staticCreeps.push(Game.creeps[crp]);
    }
    //console.log(staticCreeps);
     for(var room in Memory.spawnOrders)
     {
      var curRoom = Memory.spawnOrders[room];
      Memory.needSpawns = Memory.needSpawns || spawnRoomCreeps(curRoom, staticCreeps);
     }
  },
  createOrder: createOrderExport
};

module.exports = spawnCode;

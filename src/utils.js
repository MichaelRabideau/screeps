var roleHarvester = require('role.harvester');
var roleReloader = require('role.reloader');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairRoad = require('role.repairRoad');
var roleRepairStructures = require('role.repairStructures');
var roleDemolisher = require('role.demolisher');
var roleClaimer = require('role.claimer');
var rolePioneer = require('role.pioneer');
var roleGeneralHarvester = require('role.generalHarvester');
var roleWorker = require('role.worker');
var roleRunner = require('role.runner');
var roleSpecialHarvester = require('role.specialHarvester');
var roleHunterKiller = require("role.hunterKiller");
var roleRepair = require('role.repair');

var cleanSource = function(creep)
	{
    if(creep.memory.energyTarget)
    {
      Memory.energyTargets[creep.memory.energyTarget] -= creep.carryCapacity;
      creep.memory.energyTarget = null;
    }
	}
	
  var collect = function(creep, src)
  {
    //var response = src.transfer(creep, RESOURCE_ENERGY);
    var response = creep.withdraw(src, RESOURCE_ENERGY);
    if(response == ERR_NOT_IN_RANGE) 
      creep.moveEfficiently(src);
    else if(response == OK)
      creep.memory.closestEnergyContainer = null;
    else if(response == ERR_NOT_ENOUGH_RESOURCES)
      creep.memory.closestEnergyContainer = null;
  }
  
  var getEffectiveEnergy = function(structo)
  {
    //var energy = structo.energy - Memory.energyTargets[structo.id];
    //console.log( structo.energy + " - " + Memory.energyTargets[structo.id] );
    //IMPROVE
    var energy;
    if( structo.structureType == STRUCTURE_CONTAINER || structo.structureType == STRUCTURE_STORAGE)
      energy = structo.store[RESOURCE_ENERGY];
    else if( structo.structureType == STRUCTURE_LINK)
      energy = structo.energy;
    return energy;
  }
  
  var getPossibleTargets = function(creep)
  {
    var possibles = findStructuresExport(creep, [STRUCTURE_CONTAINER, STRUCTURE_LINK, STRUCTURE_STORAGE], 
      function(structo){return getEffectiveEnergy(structo) >= creep.carryCapacity;});
    return possibles;
  }
  
  var weakestExport = function(structures)
  {
    var curWeakest = null;
    for(var st in structures)
    {
      if(curWeakest == null)
        curWeakest = structures[st];
      else
        {
          if(curWeakest.hits/curWeakest.hitsMax > structures[st].hits / structures[st].hitsMax)
            curWeakest = structures[st];
        }
    }
    return curWeakest;
  }

  var followPathExport = function(creep, path)
  {
	  for( var i in path )
	  {
		 if(creep.room.name == path[i])
		 {
			if(path[Number(i)+1])
			{
				creep.moveEfficiently(creep.pos.findClosestByRange(creep.room.findExitTo(path[Number(i)+1])));
				return false;
			}
			else
				return true;
		 }
	 }
	 creep.moveEfficiently(creep.pos.findClosestByRange(creep.room.findExitTo(path[0])));
	 return false;
  }
  
  var findStructuresExport = function(creep, types, func)
  {
      //IMPROVE
    if(!func)
    {
      func = function(anything)
      {
        return true;
      };
    }
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        for(var type in types)
        {
          if(structure.structureType == types[type])
          {
            return func(structure);
          }
        }
        return false;
      }
    });
    return targets;
  }
  
  var splitListExport = function(list, func)
  {
    var list1 = [];
    var list2 = [];
    for(var index in list)
    {
      if(func(list[index]))
        list1.push(list[index]);
      else
        list2.push(list[index]);
    }
    return [list1, list2];
  }
  
  var roomHostilesExport = function(room)
  {
    var initialHostiles = room.find(FIND_HOSTILE_CREEPS);
    var finalHostiles = [];
    var friend;
    
    for(var crp in initialHostiles)
    {
      friend = false;
      for(var ally in Memory.allies)
      {
        if(initialHostiles[crp].owner.username == Memory.allies[ally])
        friend = true;
        break;
      }
      if(!friend)
        finalHostiles.push(initialHostiles[crp]);
    }
    return finalHostiles;
  }
  
  
  var moveEfficiently = function(target)
  {
    var walkPath = function(creep)
    {
      var moveDest = creep.memory.moveDest;
      var nextSpot = moveDest.path[moveDest.index];
      if(!nextSpot)
      {
        creep.memory.moveDest.path = creep.pos.findPathTo(moveDest.x, moveDest.y);
        creep.memory.moveDest.index = 0;
        /*nextSpot = moveDest.path[moveDest.index];
        return;*/
      }
      /*var obstacles = creep.room.getPositionAt(nextSpot.x, nextSpot.y).lookFor(LOOK_CREEPS);
      if(obstacles.length)
      {
        creep.memory.moveDest.path = creep.pos.findPathTo(moveDest.x, moveDest.y);
        creep.memory.moveDest.index = 0;  
      }*/
      if(creep.memory.moveDest.last && creep.memory.moveDest.last.x == creep.pos.x && creep.memory.moveDest.last.y == creep.pos.y)
      {
        creep.memory.moveDest.path = creep.pos.findPathTo(creep.memory.moveDest.x, creep.memory.moveDest.y);
        creep.memory.moveDest.index = 0;
      }
      else
      {
        creep.memory.moveDest.last = {x: creep.pos.x, y: creep.pos.y};
        /*creep.memory.moveDest.last.x = creep.pos.x;
        creep.memory.moveDest.last.y = creep.pos.y;*/
      }
      //creep.say(creep.memory.moveDest.index);
      creep.move(creep.memory.moveDest.path[creep.memory.moveDest.index].direction);
      creep.memory.moveDest.index ++;
    }

    if(this.memory.moveDest && this.memory.moveDest.x == target.pos.x && this.memory.moveDest.y == target.pos.y)
    {
      //I have the path. Keep moving that way. check for collisions though.
      walkPath(this);
    }
    else
    {
      //Create a path and walk it.
      this.memory.moveDest = new Object();
      this.memory.moveDest.path = this.pos.findPathTo(target, {ignoreCreeps: true});
      this.memory.moveDest.x = target.pos.x;
      this.memory.moveDest.y = target.pos.y;
      this.memory.moveDest.index = 0;
      walkPath(this);
    }
  }
  
  var extendClassesExport = function()
  {
    Creep.prototype.moveEfficiently = moveEfficiently;
    //RoomPosition.prototype.pos = function(){return this;};
    /*StructureStorage.prototype.energy = function(){return this.store[RESOURCE_ENERGY];};
    StructureStorage.prototype.energyCapacity = function(){return this.storeCapacity;};*/
  }
  
  var buildActFuncsExport = function()
  {
    funcs = new Object();
    funcs['harvester'] = roleHarvester.run;
    funcs['upgrader'] = roleUpgrader.run;
    funcs['reloader'] = roleReloader.run;
    funcs['runner'] = roleRunner.run;
    funcs['repairRoad'] = roleRepairRoad.run;
    funcs['builder'] = roleBuilder.run;
    funcs['repairStructures'] = roleRepairStructures.run;
    funcs['repair'] = roleRepair.run;
    funcs['hunterKiller'] = roleHunterKiller.run;
    funcs['specialHarvester'] = roleSpecialHarvester.run;
    funcs['demolisher'] = roleDemolisher.run;
    funcs['claimer'] = roleClaimer.run;
    funcs['pioneer'] = rolePioneer.run;
    funcs['generalHarvester'] = roleGeneralHarvester.run;

    return funcs;
  }
  

module.exports = {

    collectFromStructures: function(creep) {
        if(creep.memory.closestEnergyContainer)
          collect(creep, Game.getObjectById(creep.memory.closestEnergyContainer))
        else
        {
          var possibleTargets = getPossibleTargets(creep);
          if(possibleTargets.length)
          {
            var chosenTarget = creep.pos.findClosestByRange(possibleTargets);
            creep.memory.closestEnergyContainer = chosenTarget.id;
            collect(creep, chosenTarget);	
          }
          else
            creep.moveEfficiently(creep.room.controller);
        }
    },
    getContainers: getPossibleTargets,
    collectFromTarget: collect,
    weakest: weakestExport,
    followPath: followPathExport,
    findStructures: findStructuresExport,
    splitList: splitListExport,
    roomHostiles: roomHostilesExport,
    extendClasses: extendClassesExport,
    buildActFuncs: buildActFuncsExport
};

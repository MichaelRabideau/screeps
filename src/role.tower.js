
var utils = require('utils');

var roleTower = {

  run: function()
  {
    //For future, get list of towers?
    //var tower = Game.getObjectById('5783071ad3815af35409255b');
	var towers = _.filter(Game.structures, function(structa){return structa.structureType == STRUCTURE_TOWER;});
    
    for(var t in towers) {
		tower = towers[t];
        /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });*/
        /*var viableStructures = tower.room.find(FIND_STRUCTURES, {
          filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
          || structure.structureType == STRUCTURE_ROAD
          //|| structure.structureType == STRUCTURE_RAMPART
        });
        
        if(viableStructures.length > 0) {
            tower.repair(utils.weakest(viableStructures));
        }*/

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
  }
};

module.exports = roleTower;
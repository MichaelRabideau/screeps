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

module.exports = {
  buildActFuncs: function()
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
};

#! /usr/bin/env node
import { Command } from "commander";
import figlet from "figlet";
import { applyPlugins }  from './plugins';
import createProject from './plugins/createProject';
import listProject from './plugins/listProject';
import chooseProjectType from "./plugins/chooseProjectType";
import generateDAL from "./plugins/generateDAL";

const program = new Command();

console.log(figlet.textSync("Poeta Boilerplate"));

program
  .version("1.0.0")
  .description("React Native Boilerplate")
  .option("-l, --lp", "List projects")
  .option("-mp, --mkpro", "Create a project")
  .option("-rdal, --mkdal", "Reload shared DAL")
  .description("PHP Boilerplate")
  .parse(process.argv);

const options = program.opts();


if (options.mkpro) {
  applyPlugins([chooseProjectType, createProject]); 
}

if (options.lp) {
  applyPlugins([listProject]); 
}

if (options.mkdal) {
  applyPlugins([generateDAL]); 
}

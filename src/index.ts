#! /usr/bin/env node
import { Command } from "commander";
import figlet from "figlet";
import { applyPlugins }  from './plugins';
import createProject from './plugins/createProject';
import listProject from './plugins/listProject';
import chooseProjectType from "./plugins/chooseProjectType";
import generateCode from "./plugins/generateCode";
import generateSlice from "./plugins/generateSlice";

const program = new Command();

console.log(figlet.textSync("Poeta Boilerplate"));

program
  .version("1.0.0")
  .description("Poeta Boilerplate")
  .option("-l, --lp", "List projects")
  .option("-mp, --mkpro", "Create a project")
  .option("-mc, --mkcode", "Generate code")
  .parse(process.argv);

const options = program.opts();


if (options.mkpro) {
  applyPlugins([chooseProjectType, createProject]); 
}

if (options.mkcode) {
  applyPlugins([generateCode, generateSlice]); 
}

if (options.lp) {
  applyPlugins([listProject]); 
}



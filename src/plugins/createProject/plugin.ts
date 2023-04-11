import { execSync } from 'child_process';
import fs from "fs";
import { ProjectType } from '../chooseProjectType/_prompts';

export async function apply(value: any, previousValue: any):Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const appRoot = require('app-root-path');
  const currentDirectory = process.cwd();
  try {
    fs.lstatSync(`${currentDirectory}/packages`).isDirectory();
  }
  catch {
    await execSync(`cp -r ${appRoot.path+'/template/.'} ${currentDirectory}`, { stdio: 'pipe' });
  }

  const projectType = previousValue as ProjectType;
  switch(projectType)
  {
    case ProjectType.native:
      await execSync(`npx react-native@latest init ${value} --template git+ssh://git@bitbucket.org:poetaadmin/codebase.mobile.git#master`, { stdio: 'inherit' });
      break;
    case ProjectType.web:
      console.log('Comming soon ...');
      break;
  }

  
 
  return Promise.resolve();
}


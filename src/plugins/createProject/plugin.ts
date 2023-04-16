import { execSync } from 'child_process';
import fs from 'fs';
import * as ejs from 'ejs';
import { ProjectType } from '../chooseProjectType/_prompts';

export async function apply(value: any, previousValue: any):Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const appRoot = require('app-root-path');
  const currentDirectory = process.cwd();
  try {
    fs.lstatSync(`${currentDirectory}/packages`).isDirectory();
  }
  catch {
    await execSync(`cp -r ${appRoot.path+'/template/workspace'} ${currentDirectory}`, { stdio: 'pipe' });
  }

  const projectType = previousValue as ProjectType;

  const projectRootFolder = (path:string) =>{
    return `${appRoot.path}/template/project/${path}`;
  }

  const currentProjectFolder = (path:string) =>{
    return `${currentDirectory}/${value}/${path}`;
  }
  const podFile = 'ios/Podfile';
  const manifest = 'android/app/src/main/AndroidManifest.xml';
  const gradle = 'android/app/build.gradle';

  switch(projectType)
  {
    case ProjectType.native:
      await execSync(`npx react-native@latest init ${value} --template git+ssh://git@bitbucket.org:poetaadmin/codebase.mobile.git#master`, { stdio: 'inherit' });
      break;
    case ProjectType.web:
      
      await execSync(`
      bash configuration.sh ${projectRootFolder(podFile)} ${value} ${currentProjectFolder(podFile)} &&
      bash configuration.sh ${projectRootFolder('android/AndroidManifest.xml')} ${value} ${currentProjectFolder(manifest)} &&
      bash configuration.sh ${projectRootFolder('android/build.gradle')} ${value} ${currentProjectFolder(gradle)}`, { stdio: 'inherit' });
      break;
  }
 
  return Promise.resolve();
}




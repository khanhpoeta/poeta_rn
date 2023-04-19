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

  const currentProjectFolder = (path?:string) =>{
    if(path || path !== '')
    {
      return `${currentDirectory}/${value}/${path}`;
    }
    return  `${currentDirectory}/${value}`;
  }
  const podFile = 'ios/Podfile';
  const manifest = 'android/app/src/main/AndroidManifest.xml';
  const gradle = 'android/app/build.gradle';

  switch(projectType)
  {
    case ProjectType.native:
      await execSync(`
      npx react-native@latest init ${value} --template git+ssh://git@bitbucket.org:poetaadmin/codebase.mobile.git#master &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder(podFile)} ${value} ${currentProjectFolder(podFile)} &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder('android/AndroidManifest.xml')} ${value} ${currentProjectFolder(manifest)} &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder('android/build.gradle')} ${value} ${currentProjectFolder(gradle)} &&
      cp -r ${projectRootFolder('react-native-xcode.sh')} ${currentProjectFolder('')}
      `, { stdio: 'inherit' });
      break;
    case ProjectType.web:
      fs.readFile(`${appRoot.path+'/template/workspace'}/package.json`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const packageJson = JSON.parse(data);
        const workspaces = packageJson['workspaces'];
        const packages = workspaces['packages'] as string[];
        packages.push(value);
        const scripts = packageJson['scripts'];
        scripts[`${value}:pods`] = `yarn workspace ${value} pods`;
        scripts[`${value}:start`] = `yarn workspace ${value} start`;
        scripts[`${value}:ios`] = `[  -z "$env" ] && env=qc yarn workspace ${value} ios || env=$env yarn workspace ${value} ios`;
        scripts[`${value}:android`] = `[  -z "$env" ] && env=qc yarn workspace abcd android $env || env=$env yarn workspace abcd android $env`;
        fs.writeFile(`${currentDirectory}/package.json`, JSON.stringify(packageJson, null, 2), (err) => {
            console.log(err);
        });
        console.log(packageJson);
      });
      break;
  }
 
  return Promise.resolve();
}




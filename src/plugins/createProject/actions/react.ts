
import { appRoot, currentDirectory, projectRootFolder } from '../../../plugins/utils';
import { execSync } from 'child_process';
import fs from 'fs';

interface ILaunch {
    preLaunchTask: string;
    name: string;
    request: string;
    type: string;
    cwd: string;
    platform: string;
}
  
interface ITask {
    label: string;
    command: string;
    args: string[];
    type: string;
}

const podFile = 'ios/Podfile';
const manifest = 'android/app/src/main/AndroidManifest.xml';
const gradle = 'android/app/build.gradle';

export const currentProjectFolder = (value:string, path?:string) =>{
    if(path || path !== '')
    {
      return `${currentDirectory}/${value}/${path}`;
    }
    return  `${currentDirectory}/${value}`;
}

export const clonePackage = async () => {
    try {
      fs.lstatSync(`${currentDirectory}/packages`).isDirectory();
    }
    catch {
      await execSync(`
      git clone --branch packages git@bitbucket.org:poetaadmin/codebase.mobile.git && 
      rm -rf codebase.mobile/.git &&
      cd codebase.mobile && mv $(ls -a --ignore=. --ignore=..) .. && cd ..
      rm -rf codebase.mobile`, { stdio: 'inherit' });
    }
}

export const copyResource = async (projectType:string, value:string)=> {
    try {
      fs.lstatSync(`${currentDirectory}/${value}`).isDirectory();
    }
    catch{
      await execSync(`
      npx react-native@0.71.11 init ${value} --template git+ssh://git@bitbucket.org:poetaadmin/codebase.mobile.git#template &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder(projectType, podFile)} ${value} ${currentProjectFolder(value,podFile)} &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder(projectType, 'android/AndroidManifest.xml')} ${value} ${currentProjectFolder(value,manifest)} &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder(projectType, 'android/build.gradle')} ${value} ${currentProjectFolder(value,gradle)} &&
      bash ${appRoot.path}/configuration.sh ${projectRootFolder(projectType, 'android/settings.gradle')} ${value} ${currentProjectFolder(value,'android/settings.gradle')} &&
      cp -r ${projectRootFolder(projectType, 'react-native-xcode.sh')} ${currentProjectFolder(value,'')} &&
      cp -r ${projectRootFolder(projectType, 'android/gradle.properties')} ${currentProjectFolder(value,'android')}
      `, { stdio: 'inherit' });
    }
}

export const installPackages = async ()=> {
    await execSync(`yarn && yarn build`, { stdio: 'inherit' });
}

export const replaceWorkspacePackageContent = (value:string):Promise<void> => {
  const workspacePackagePath = `${currentDirectory}/package.json`;
  return new Promise<void>((resolve) => {
    fs.readFile(workspacePackagePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const packageJson = JSON.parse(data);
      const workspaces = packageJson['workspaces'];
      const packages = workspaces['packages'] as string[];
      packages.push(value);

      // Add script to run application
      const scripts = packageJson['scripts'];
      scripts[`${value}:pods`] = `yarn workspace ${value} pods`;
      scripts[`${value}:start`] = `[ -z "$env" ] && env=qc yarn workspace ${value} start || env=$env yarn workspace ${value} start`;
      scripts[`${value}:ios`] = `[ -z "$env" ] && env=qc yarn workspace ${value} ios || env=$env yarn workspace ${value} ios`;
      scripts[`${value}:android`] = `[ -z "$env" ] && env=qc yarn workspace ${value} android || env=$env yarn workspace ${value} android`;
      scripts[`${value}:release_ios`] = `[ -z "$env" ] && env=qc yarn workspace ${value} release:ios || env=$env yarn workspace ${value} release:ios`;
      scripts[`${value}:release_android`] = `[ -z "$env" ] && env=qc yarn workspace ${value} release:android || env=$env yarn workspace ${value} release:android`;
      fs.writeFile(workspacePackagePath, JSON.stringify(packageJson, null, 2), (err) => {
          resolve();
      });
    });
  })
}

export const updateProjectPackageContent = (value:string):Promise<void> => {
  const projectPackagePath = `${currentDirectory}/${value}/package.json`;
  return new Promise<void>((resolve) => {
    fs.readFile(projectPackagePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const packageJson = JSON.parse(data);
      // Add script to share packages
      const dependencies = packageJson['dependencies'];
      dependencies[`@poeta/shared`] = `0.0.1`;
      dependencies[`@poeta/react-native-shared`] = `0.0.1`;

      fs.writeFile(projectPackagePath, JSON.stringify(packageJson, null, 2), (err) => {
          resolve();
      });
    });
  })
}

export const configLaunchVSCode = (value:string):Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentDirectory}/.vscode/launch.json`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const launchJson = JSON.parse(data);
        const configurations = launchJson['configurations'] as ILaunch[];
        if (configurations.filter(configuration => configuration.preLaunchTask === `${value}_android`).length === 0)
        {
          configurations.push({
            preLaunchTask: `${value}_android`, 
            name: `Android ${value}`,
            request: 'launch',
            type: 'reactnativedirect',
            cwd: `/${value}`,
            platform: 'android'
          })
        }
        fs.writeFile(`${currentDirectory}/.vscode/launch.json`, JSON.stringify(launchJson, null, 2), (err) => {
            resolve();
        });
      });
    })
}

export const configTaskVSCode = (value:string):Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentDirectory}/.vscode/tasks.json`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const taskJson = JSON.parse(data);
        const tasks = taskJson['tasks'] as ITask[];
        if (tasks.filter(task => task.label === `${value}_android`).length === 0)
        {
          tasks.push({
            label: `${value}_android`, 
            command: `yarn ${value}:android`,
            args: [],
            type: 'shell',
          })
        }
        fs.writeFile(`${currentDirectory}/.vscode/tasks.json`, JSON.stringify(taskJson, null, 2), (err) => {
            resolve();
        });
      });
    })
}

export const replaceXcodeProjectConfig = (value:string):Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentProjectFolder(value,`ios/${value}.xcodeproj/project.pbxproj`)}`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const content = data;
        const replaceWithEnvironment = content.replace("../node_modules/react-native/scripts/xcode/with-environment.sh","../../node_modules/react-native/scripts/xcode/with-environment.sh");
        const replaceReactNativeXcode = replaceWithEnvironment.replace("../node_modules/react-native/scripts/react-native-xcode.sh","../react-native-xcode.sh");
        fs.writeFile(`${currentProjectFolder(value,`ios/${value}.xcodeproj/project.pbxproj`)}`, replaceReactNativeXcode, () => {
            resolve();
        });
      });
    })
}
import { execSync } from 'child_process';
import fs from 'fs';
import { ProjectType } from '../chooseProjectType/_prompts';
import spinners from 'cli-spinners';
import { green, blue } from 'kleur';
import { appRoot, currentDirectory, projectRootFolder } from '../utils';

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

export async function apply(value: any, previousValue: any):Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  try {
    fs.lstatSync(`${currentDirectory}/packages`).isDirectory();
  }
  catch {
    await execSync(`cp -a ${appRoot.path+'/template/workspace/.'} ${currentDirectory}`, { stdio: 'pipe' });
  }

  const projectType = previousValue as ProjectType;

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

  const copyResource = async ()=> {
    await execSync(`
    npx react-native@latest init ${value} --template git+ssh://git@bitbucket.org:poetaadmin/codebase.mobile.git#template &&
    bash ${appRoot.path}/configuration.sh ${projectRootFolder(podFile)} ${value} ${currentProjectFolder(podFile)} &&
    bash ${appRoot.path}/configuration.sh ${projectRootFolder('android/AndroidManifest.xml')} ${value} ${currentProjectFolder(manifest)} &&
    bash ${appRoot.path}/configuration.sh ${projectRootFolder('android/build.gradle')} ${value} ${currentProjectFolder(gradle)} &&
    bash ${appRoot.path}/configuration.sh ${projectRootFolder('android/settings.gradle')} ${value} ${currentProjectFolder('android/settings.gradle')} &&
    cp -r ${projectRootFolder('react-native-xcode.sh')} ${currentProjectFolder('')} &&
    cp -r ${projectRootFolder('android/gradle.properties')} ${currentProjectFolder('android')}
    `, { stdio: 'inherit' });
  }

  const replaceWorkspacePackageContent = ():Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentDirectory}/package.json`, 'utf8', (err, data) => {
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
        scripts[`${value}:start`] = `[  -z "$env" ] && env=qc yarn workspace ${value} start || env=$env yarn workspace ${value} start`;
        scripts[`${value}:ios`] = `[  -z "$env" ] && env=qc yarn workspace ${value} ios || env=$env yarn workspace ${value} ios`;
        scripts[`${value}:android`] = `[  -z "$env" ] && env=qc yarn workspace ${value} android $env || env=$env yarn workspace ${value} android $env`;
        fs.writeFile(`${currentDirectory}/package.json`, JSON.stringify(packageJson, null, 2), (err) => {
            resolve();
        });
      });
    })
  }

  const configLaunchVSCode = ():Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentDirectory}/.vscode/launch.json`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const launchJson = JSON.parse(data);
        const configurations = launchJson['configurations'] as ILaunch[];
        configurations.push({
          preLaunchTask: `${value}_android`, 
          name: `Android ${value}`,
          request: 'launch',
          type: 'reactnativedirect',
          cwd: `/${value}`,
          platform: 'android'
        })
        fs.writeFile(`${currentDirectory}/.vscode/launch.json`, JSON.stringify(launchJson, null, 2), (err) => {
            resolve();
        });
      });
    })
  }

  const configTaskVSCode = ():Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentDirectory}/.vscode/tasks.json`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const taskJson = JSON.parse(data);
        const tasks = taskJson['tasks'] as ITask[];
        tasks.push({
          label: `${value}_android`, 
          command: `yarn ${value}:android`,
          args: [],
          type: 'shell',
        })
        fs.writeFile(`${currentDirectory}/.vscode/tasks.json`, JSON.stringify(taskJson, null, 2), (err) => {
            resolve();
        });
      });
    })
  }

  const replaceXcodeProjectConfig = ():Promise<void> => {
    return new Promise<void>((resolve) => {
      fs.readFile(`${currentProjectFolder(`ios/${value}.xcodeproj/project.pbxproj`)}`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const content = data;
        const replaceWithEnvironment = content.replace("../node_modules/react-native/scripts/xcode/with-environment.sh","../../node_modules/react-native/scripts/xcode/with-environment.sh");
        const replaceReactNativeXcode = replaceWithEnvironment.replace("../node_modules/react-native/scripts/react-native-xcode.sh","../react-native-xcode.sh");
        fs.writeFile(`${currentProjectFolder(`ios/${value}.xcodeproj/project.pbxproj`)}`, replaceReactNativeXcode, () => {
            resolve();
        });
      });
    })
  }

  switch(projectType)
  {
    case ProjectType.native:
      console.log(spinners.dots);
      await copyResource();
      Promise.all([replaceWorkspacePackageContent(), replaceXcodeProjectConfig(), configTaskVSCode(), configLaunchVSCode()])
      .then(() => {
        console.log(
          `${green(
            'completed'
          )}`,
        );
      });
      break;
    case ProjectType.web:
      console.log(
        `${blue(
          'comming soon!'
        )}`,
      );
      break;
  }
 
  return Promise.resolve();
}




import { ProjectType } from '../chooseProjectType/_prompts';
import { green, blue } from 'kleur';
import { IResponse } from '@/models';
import { PluginActions } from '../../constants';
import { 
  clonePackage, 
  configLaunchVSCode, 
  configTaskVSCode, 
  copyResource, 
  installPackages, 
  replaceWorkspacePackageContent, 
  replaceXcodeProjectConfig 
} from './actions/react';



export async function apply(value: any, previousValues: IResponse[]):Promise<void> {

  const projectType = previousValues.filter(res => res.name === PluginActions.ChooseProjectType).shift()?.value as ProjectType;

  switch(projectType)
  {
    case ProjectType.native:
      await clonePackage();
      await copyResource(projectType,value);
      Promise.all([replaceWorkspacePackageContent(value), replaceXcodeProjectConfig(value), configTaskVSCode(value), configLaunchVSCode(value)])
      .then(async () => {
        await installPackages();
        console.log(
          `${green(
            'Happy coding !'
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




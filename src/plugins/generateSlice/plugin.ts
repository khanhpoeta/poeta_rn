
import fs from "fs";
import {currentProjectFolder, projectRootFolder} from "../utils";
import {green} from "kleur";
import { ProjectType } from "../../constants";
import { TemplateEngineCollection } from "../../templateEngine/TemplateEngineCollection";
import { StepStatus } from "../../models";

export async function apply(select:any):Promise<StepStatus> {
  const sliceName = select.value.firstUpper();
  return new Promise<StepStatus>((resolve, reject) => {
    TemplateEngineCollection.defaultEngine
      .generateTemplateByFile(`${projectRootFolder(ProjectType.native, 'slices/slicetemplate.handlebars')}`,{sliceName})
      .then(response => {
        if(!response) return;
        fs.writeFile(`${currentProjectFolder(`packages/shared/src/store/${sliceName}Slice.ts`)}`, response, (err) => {
          if(err)
          {
            reject(err);
            console.log(err);
          }
          console.log(
            `${green(
              'completed'
            )}`,
          );
          resolve(StepStatus.Stop);
        });
      });
  })
}


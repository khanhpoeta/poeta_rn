import fs from "fs";
import { TemplateEngineCollection } from "../../../templateEngine/TemplateEngineCollection";
import { StepStatus } from "../../../models";
import { projectRootFolder, currentProjectFolder } from "../../../plugins/utils";
import { ProjectType  } from "../../../constants";
import { JSONArray } from "../../../templateEngine/TemplateEngine";

export const generateSlice = (value:any):Promise<StepStatus> => {
    const sliceName = value.firstUpper();
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
            resolve(StepStatus.Stop);
          });
        });
    })
}

export const reloadIndex = ():Promise<StepStatus> => {
    return new Promise<StepStatus>((resolve, reject) => {
      const ignoreFiles = ['index.ts','types.ts'];
      fs.readdir(`${currentProjectFolder('packages/shared/src/store')}`, (_error,files) => {
      const slices: JSONArray = [];
      files.filter(f => !ignoreFiles.includes(f)).sort().forEach(file => {
        const className = file.replace('Slice.ts','');
        slices.push({
              className
            })
        })
        TemplateEngineCollection.defaultEngine
        .generateTemplateByFile(`${projectRootFolder(ProjectType.native, 'slices/index.handlebars')}`,{slices})
        .then(response => {
          if(!response) return Promise.resolve(StepStatus.Stop);
          fs.writeFile(`${currentProjectFolder('packages/shared/src/store/index.ts')}`, response, (err) => {
            if(err)
            {
              reject(err);
            }
            resolve(StepStatus.Stop);
          });
        });
      });
    });
  }


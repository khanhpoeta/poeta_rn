
import { StepStatus } from '../../models';
import { ProjectType } from '../../constants';
import { GenerateNativeCode } from './_prompts';
import fs from "fs";
import {camelCase} from 'lodash';
import {currentProjectFolder, projectRootFolder} from "../utils";
import { TemplateEngineCollection } from "../../templateEngine/TemplateEngineCollection";
import { JSONArray } from "../../templateEngine/TemplateEngine";


export async function apply(select: any):Promise<StepStatus> {
  const codeType = select.value as GenerateNativeCode;
  return new Promise<StepStatus>((resolve, reject) => {
    if(codeType === GenerateNativeCode.generateSlice){
      resolve(StepStatus.Next);
    }
    const ignoreFiles = ['index.ts', 'SharedDALCollection.ts', 'BaseDAL.ts', 'HttpClient.ts'];
    fs.readdir(`${currentProjectFolder('packages/shared/src/dal')}`, (_error,files) => {
    const dals: JSONArray = [];
    files.filter(f => !ignoreFiles.includes(f)).sort().forEach(file => {
      const className = file.replace('.ts','');
      dals.push({
            className,
            variable: camelCase(className)
          })
      })
      TemplateEngineCollection.defaultEngine
      .generateTemplateByFile(`${projectRootFolder(ProjectType.native, 'dal/SharedDALCollection.handlebars')}`,{'dals': dals})
      .then(response => {
        if(!response) return Promise.resolve(StepStatus.Stop);
        fs.writeFile(`${currentProjectFolder('packages/shared/src/dal/SharedDALCollection.ts')}`, response, (err) => {
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

import fs from "fs";
import {camelCase} from 'lodash';
import {currentProjectFolder, projectRootFolder} from "../utils";
import {green} from "kleur";
import { ProjectType } from "../../constants";
import { TemplateEngineCollection } from "../../templateEngine/TemplateEngineCollection";
import { JSONArray } from "../../templateEngine/TemplateEngine";

export async function apply():Promise<void> {
  return new Promise<void>((resolve, reject) => {
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
        if(!response) return;
        fs.writeFile(`${currentProjectFolder('packages/shared/src/dal/SharedDALCollection.ts')}`, response, (err) => {
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
          resolve();
        });
      });
    })
  })
}

import fs from "fs";
import {camelCase} from 'lodash';
import {renderFile} from 'ejs';
import {currentProjectFolder, projectRootFolder} from "../utils";
import {green} from "kleur";

interface DALInfo{
  className: string,
  variable: string,
}

export async function apply():Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.readdir(`${currentProjectFolder('packages/shared/src/dal/extentions')}`, (_error,files) => {
      const dals: DALInfo[] = [];
      files.sort().forEach(file => {
        const className = file.replace('.ts','');
        dals.push({
          className,
          variable: camelCase(className)
        })
      })
      renderFile(`${projectRootFolder('dal/SharedDALCollection.ejs')}`,{dals}).then(resonse => {
        fs.writeFile(`${currentProjectFolder('packages/shared/src/dal/SharedDALCollection.ts')}`, resonse, (err) => {
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
      }).catch(error => console.log(error));
    })
  })
}

import fs from "fs";
import { blue } from 'kleur';
import {camelCase} from 'lodash';
import {renderFile} from 'ejs';

interface DALInfo{
  className: string,
  variable: string,
}

export async function apply():Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const appRoot = require('app-root-path');
  const currentDirectory = process.cwd();

  const projectRootFolder = (path:string) =>{
    return `${appRoot.path}/template/project/${path}`;
  }

  const currentProjectFolder = (path?:string) =>{
    if(path || path !== '')
    {
      return `${currentDirectory}/${path}`;
    }
    return  `${currentDirectory}`;
  }  

  return new Promise<void>((resolve) => {
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
        console.log(resonse);
        fs.writeFile(`${currentProjectFolder('packages/shared/src/dal/SharedDALCollection.ts')}`, resonse, (err) => {
          console.log(err);
          resolve();
        });
      }).catch(error => console.log(error));
    })
  })
}
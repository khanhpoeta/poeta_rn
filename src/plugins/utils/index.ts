import * as path from 'path';


// eslint-disable-next-line @typescript-eslint/no-var-requires
export const appRoot = require('app-root-path');
export const currentDirectory: string = path.resolve();


export const projectRootFolder = (projectType:string, path:string) =>{
  return `${appRoot.path}/template/${projectType}/${path}`;
}

export const currentProjectFolder = (path?:string) =>{
  if(path || path !== '')
  {
    return `${currentDirectory}/${path}`;
  }
  return  `${currentDirectory}`;
}

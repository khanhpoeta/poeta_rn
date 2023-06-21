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

Object.defineProperty(String.prototype, 'firstUpper', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'firstLower', {
  value: function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
  },
  enumerable: false
});

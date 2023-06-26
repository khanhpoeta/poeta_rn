import { currentDirectory } from '../../../plugins/utils';
import { execSync } from 'child_process';
import fs from 'fs';

export const create = async (value:string)=> {
    try {
      fs.lstatSync(`${currentDirectory}/${value}`).isDirectory();
    }
    catch{
      await execSync(`
      yarn create next-app ${value} --ts --tailwind --eslint --src-dir --app --import-alias --use-yarn
      `, { stdio: 'inherit' });
    }
}
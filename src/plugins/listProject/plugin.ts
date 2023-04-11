
import fs from "fs";

export async function apply():Promise<void> {
  return new Promise<void>(resolve => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const currentDirectory = process.cwd();
    const listProjects = fs.readdirSync(`${currentDirectory}`)
    listProjects.forEach(file => {
      if (fs.lstatSync(`${currentDirectory}/${file}`).isDirectory() )
      {
        console.log(file);
      }
    })
    resolve();
  });
}
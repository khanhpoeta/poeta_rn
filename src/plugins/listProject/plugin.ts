
import fs from "fs";
import { blue } from 'kleur';

export async function apply():Promise<void> {
  const currentDirectory = process.cwd();

  return new Promise<void>((resolve) => {
    fs.readFile(`${currentDirectory}/package.json`, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const packageJson = JSON.parse(data);
      const workspaces = packageJson['workspaces'];
      const packages = workspaces['packages'] as string[];
      console.log(
        `${blue(
          packages.filter(project => project !== 'packages/*').join('\n')
        )}`,
      );
      resolve();
    });
  })
}
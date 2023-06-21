
import { StepStatus } from '../../models';
import fs from "fs";
import { blue } from 'kleur';

export async function apply():Promise<StepStatus> {
  const currentDirectory = process.cwd();

  return new Promise<StepStatus>((resolve) => {
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
      resolve(StepStatus.Stop);
    });
  })
}
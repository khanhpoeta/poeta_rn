import {green} from "kleur";
import { StepStatus } from "../../models";
import { generateSlice, reloadIndex } from "./actions";

export async function apply(select:any):Promise<StepStatus | any> {
  return Promise.all([generateSlice(select), reloadIndex()])
      .then(async () => {
        console.log(
          `${green(
            'Happy coding !'
          )}`,
        );
        return Promise.resolve(StepStatus.Stop);
      });
}


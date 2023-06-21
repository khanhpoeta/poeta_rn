import {green} from "kleur";
import { StepStatus } from "../../models";
import { generateSlice, reloadIndex } from "./actions";

export async function apply(select:any):Promise<StepStatus> {
  return Promise.all([generateSlice(select.value), reloadIndex()])
      .then(async () => {
        console.log(
          `${green(
            'Happy coding !'
          )}`,
        );
        return Promise.resolve(StepStatus.Stop);
      });
}


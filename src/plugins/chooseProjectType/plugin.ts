import { StepStatus } from "@/models";

export async function apply(value: string):Promise<StepStatus | any> {
  return Promise.resolve(value);
}


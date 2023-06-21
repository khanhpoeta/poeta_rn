import { PluginActions } from "@/constants";
import { PromptObject } from "prompts";
import { IResponse } from "./IResponse";

export enum StepStatus{
    Next = 'Next',
    Stop = 'Stop'
}

export interface IPlugin {
    name: PluginActions,
    option: PromptObject | undefined,
    apply(value:any, previousValues: IResponse[]): Promise<StepStatus | any>
}
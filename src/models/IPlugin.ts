import { PluginActions } from "@/constants";
import { PromptObject } from "prompts";
import { IResponse } from "./IResponse";

export interface IPlugin {
    name: PluginActions,
    option: PromptObject | undefined,
    apply(value:any, previousValues: IResponse[]): Promise<void>
}
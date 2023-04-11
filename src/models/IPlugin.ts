import { PromptObject } from "prompts";

export interface IPlugin {
    name: string,
    option: PromptObject | undefined,
    apply(value:any, response: any): Promise<void>
}
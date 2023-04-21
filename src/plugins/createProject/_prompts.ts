import { PromptObject } from "prompts";

export enum ProjectType{
  native = 'native',
  web = 'web'
}

export default {
  name: 'value',
  type: 'text',
  color: 'blue',
  message: 'Input your project name: ',
} as PromptObject;

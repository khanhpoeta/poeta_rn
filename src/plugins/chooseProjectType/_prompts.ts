import { PromptObject } from "prompts";

export enum ProjectType{
  native = 'native',
  web = 'web'
}

export default {
  name: 'value',
  type: 'select',
  color: 'blue',
  message: 'Choose the project type',
  choices: [
    {
      title:'native', 
      selected: false,
      value: ProjectType.native
    },
    {
      title:'web', 
      selected: false,
      value: ProjectType.web
    }
  ],
} as PromptObject;

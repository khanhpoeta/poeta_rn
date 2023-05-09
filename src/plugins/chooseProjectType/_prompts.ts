import { PromptObject } from "prompts";

export enum ProjectType{
  native = 'native',
  web = 'web',
  php = 'php'
}

export default {
  name: 'value',
  type: 'select',
  color: 'blue',
  message: 'Choose the project type',
  choices: [
    {
      title: ProjectType.native, 
      selected: false,
      value: ProjectType.native
    },
    {
      title: ProjectType.web, 
      selected: false,
      value: ProjectType.web
    },
    {
      title: ProjectType.php, 
      selected: false,
      value: ProjectType.php
    }
  ],
} as PromptObject;

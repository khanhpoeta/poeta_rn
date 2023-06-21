
import { PromptObject } from "prompts";

export enum GenerateNativeCode{
  generateDAL = 'Reload SharedDALCollection',
  generateSlice = 'Generate Slice'
}

export default {
  name: 'value',
  type: 'select',
  color: 'blue',
  message: 'Choose generate code',
  choices: [
    {
      title: GenerateNativeCode.generateDAL, 
      selected: false,
      value: GenerateNativeCode.generateDAL
    },
    {
      title: GenerateNativeCode.generateSlice, 
      selected: false,
      value: GenerateNativeCode.generateSlice
    },
  ],
} as PromptObject;

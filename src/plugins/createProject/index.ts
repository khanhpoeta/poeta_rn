import { IPlugin } from '@/models';
import option from './_prompts';
import { apply } from './plugin';


export default {
  name: 'chooseProjectType',
  option,
  apply,
} as IPlugin;
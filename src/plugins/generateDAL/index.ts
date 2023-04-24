import { IPlugin } from '@/models';
import { apply } from './plugin';


export default {
  name: 'chooseProjectType',
  option: undefined,
  apply,
} as IPlugin;
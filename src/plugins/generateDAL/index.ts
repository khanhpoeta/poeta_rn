import { IPlugin } from '@/models/IPlugin';
import { apply } from './plugin';


export default {
  name: 'chooseProjectType',
  option: undefined,
  apply,
} as IPlugin;
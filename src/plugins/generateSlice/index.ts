import { IPlugin } from '@/models';
import option from './_prompts';
import { apply } from './plugin';
import { PluginActions } from '../../constants';


export default {
  name: PluginActions.GenerateSlice,
  option,
  apply,
} as IPlugin;
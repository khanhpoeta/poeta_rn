import { IPlugin } from '@/models/IPlugin';
import option from './_prompts';
import { apply } from './plugin';
import { PluginActions } from '../../constants';


export default {
  name: PluginActions.ChooseProjectType,
  option,
  apply,
} as IPlugin;
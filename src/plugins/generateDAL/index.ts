import { IPlugin } from '@/models';
import { apply } from './plugin';
import { PluginActions } from '../../constants';


export default {
  name: PluginActions.GenerateDAL,
  option: undefined,
  apply,
} as IPlugin;
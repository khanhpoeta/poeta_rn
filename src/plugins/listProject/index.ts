
import { PluginActions } from '../../constants';
import { apply } from './plugin';
import { IPlugin } from '@/models';

export default {
  name: PluginActions.ListProject,
  option: undefined,
  apply,
} as IPlugin;

import prompts from 'prompts';
import { IPlugin } from '@/models';

/**
 * Apply a plugin
 * @param name: the plugin name
 * @param promptsOptions: the options for the prompts function (if null -> no prompt)
 * @param apply: the refactoring to apply
 * @param response: previous prompt response
 * @return {Promise<*>}
 */
async function applyPlugin(plugin: IPlugin, response: any) {
  const {option,apply} = plugin;
  if(option)
  {
    const {value} = await prompts(option);
    return await apply(value, response);
  }
  return await apply(null, response);
}

export async function applyPlugins(plugins: IPlugin[]) {
  return plugins.reduce((p, plugin) => {
    return p.then(async (response) => await applyPlugin(plugin,response));
 }, Promise.resolve());
}

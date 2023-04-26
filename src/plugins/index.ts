import prompts from 'prompts';
import { IPlugin } from '@/models';
import { IResponse } from '@/models';

/**
 * Apply a plugin
 * @param name: the plugin name
 * @param promptsOptions: the options for the prompts function (if null -> no prompt)
 * @param apply: the refactoring to apply
 * @param response: previous prompt response
 * @return {Promise<*>}
 */


async function applyPlugin(plugin: IPlugin, responses: IResponse[]) {
  const {option,apply} = plugin;
  const response = responses.filter(res => res.name === plugin.name).shift();
    
  if(option)
  {
    const {value} = await prompts(option);
    if(response)
    {
      response.value = value;
    }
    return await apply(value, responses);
  }
  if(response)
    {
      response.value = undefined;
    }
  return await apply(null, responses);
}

export async function applyPlugins(plugins: IPlugin[]) {
  const responses: IResponse[] = [];
  return plugins.reduce((p, plugin) => {
    return p.then(async (response) => {
      responses.push({name:plugin.name,value:response});
      return await applyPlugin(plugin,responses)});
 }, Promise.resolve());
}

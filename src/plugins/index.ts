import { IPlugin, StepStatus, IResponse } from '../models';
import prompts from 'prompts';
/**
 * Apply a plugin
 * @param name: the plugin name
 * @param promptsOptions: the options for the prompts function (if null -> no prompt)
 * @param apply: the refactoring to apply
 * @param response: previous prompt response
 * @return {Promise<*>}
 */

let responses: IResponse[] = [];

async function applyPlugin(plugin: IPlugin, responses: IResponse[]): Promise<StepStatus | any> {
  const {option,apply} = plugin;
  if(option)
  {
    return prompts(option).then((response) => {
      responses.push({name:plugin.name,value:response.value});
      return apply(response.value, responses);
    })
  }
  return apply(null, responses);
}

export async function applyPlugins(plugins: IPlugin[]) {
  responses = [];
  return plugins.reduce((p, plugin) => {
    return p.then(async (response) => {
      if(response === StepStatus.Stop)
      {
        return;
      }
      return applyPlugin(plugin,responses)
    });
 }, Promise.resolve(StepStatus.Next));
}

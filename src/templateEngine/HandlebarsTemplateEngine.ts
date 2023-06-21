import * as Handlebars from "handlebars";
import { JSONArray, JSONObject, TemplateEngine } from "./TemplateEngine";

export class HandlebarsTemplateEngine extends TemplateEngine {
    protected formatContent(content: string, parameters: JSONObject | JSONArray): Promise<string> {
        const handlebar = Handlebars.compile(content);
        const result = handlebar(parameters);
        return Promise.resolve(result);
    }
}

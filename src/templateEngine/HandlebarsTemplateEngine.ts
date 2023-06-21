import * as Handlebars from "handlebars";
import { JSONArray, JSONObject, TemplateEngine } from "./TemplateEngine";

export class HandlebarsTemplateEngine extends TemplateEngine {
    protected formatContent(content: string, parameters: JSONObject | JSONArray): Promise<string> {
        Handlebars.registerHelper('firstLower', function (aString) {
            return aString.firstLower();
        })
        Handlebars.registerHelper('firstUpper', function (aString) {
            return aString.firstUpper();
        })
        const handlebar = Handlebars.compile(content);
        const result = handlebar(parameters);
        return Promise.resolve(result);
    }
}



import { HandlebarsTemplateEngine } from "./HandlebarsTemplateEngine";
import { TemplateEngine } from "./TemplateEngine";

export class TemplateEngineCollection {
    static readonly defaultEngine: TemplateEngine = new HandlebarsTemplateEngine();
}
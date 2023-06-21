
import fs from "fs";

export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

export interface JSONObject {
    [x: string]: JSONValue;
}

export type JSONArray = Array<JSONValue>;


export abstract class TemplateEngine {

    protected abstract formatContent(content: string, parameters: JSONObject | JSONArray): Promise<string>;

    public generateTemplateByFile(filePath: string, parameters: JSONObject | JSONArray): Promise<string | undefined> {
        if (!fs.existsSync(filePath)) {
            return Promise.reject(`file doesn't exist!`);
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        return this.formatContent(content, parameters);
    }

    public generateTemplateByContent(content: string, parameters: JSONObject | JSONArray): Promise<string | undefined> {
        return this.formatContent(content, parameters);
    }
}
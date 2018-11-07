
import { load, dump } from 'js-yaml'
import { readFileSync } from 'fs';

export function get_fixture(name: string) {
    return readFileSync(`fixtures/${name}`).toString();
}

export function load_fixture(name: string) {
    const text = readFileSync(`fixtures/${name}`).toString();
    const json = load(text);
    const jsonStr = dump(json);
    return [text, json, jsonStr];
}

export function load_fixture_str(text: string) {
    const json = load(text);
    const jsonStr = dump(json);
    return [text, json, jsonStr];
}

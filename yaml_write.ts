
import { merge, diffLines, IDiffResult } from 'diff';
import { load, dump } from 'js-yaml'
import { readFileSync } from 'fs';

function get_fixture(name: string) {
    return readFileSync(`fixtures/${name}`).toString();
}

function load_fixture(name: string) {
    const text = readFileSync(`fixtures/${name}`).toString();
    const json = load(text);
    const jsonStr = dump(json);
    return [text, json, jsonStr];
}

function mergeYaml(org: string, orgConvered: string, modified: string) {
    const result = diffLines(org, orgConvered, { ignoreCase: false, ignoreWhitespace: true })
    const lines = org.split('\n');
    let idxLine = 0;
    const newYaml = [];
    const peak = () => lines[idxLine];
    const next = () => {
        const ret = lines[idxLine];
        idxLine += 1;
        return ret;
    }
    const getComments = (diffResult: IDiffResult) => {
        const lines = diffResult.value.replace(/\n$/mg, '').split('\n');
        const ret: string[] = [];
        for (const line of lines) {
            if (/^\s*#/.test(line)) {
                ret.push(line);
            }
            if (/^\s*$/.test(line)) {
                ret.push(line);
            }
        }
        return ret;
    }

    for (const diffResult of result) {
        if (diffResult.removed) {
            for (const line of getComments(diffResult)) {
                newYaml.push(line);
            }
            idxLine += diffResult.count;
        } else if (diffResult.added) {
        } else {
            for (let i = 0; i < diffResult.count; i += 1) {
                newYaml.push(next())
            }
        }
    }

    if (peak() !== undefined) {
        newYaml.push(next());
    }

    return newYaml.join('\n');
}

console.log('yaml write')

const [org, json, converted] = load_fixture('array.yaml');

const yamlMerged = mergeYaml(org, converted, '');

const result = diffLines(org, yamlMerged)
// const merged = merge(converted, org, '');

console.log('finished')

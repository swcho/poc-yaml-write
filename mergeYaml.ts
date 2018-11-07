
import { diffLines, IDiffResult } from 'diff';

export function mergeYaml(org: string, orgConvered: string, modified: string) {
    const result = diffLines(org, modified)
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
            newYaml.push(diffResult.value.replace(/\n$/mg, ''))
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

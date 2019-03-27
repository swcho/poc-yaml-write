import { ast, ParsedCST, cst } from 'yaml';

export type NodeExt = ast.AstNode & {
    dirty: boolean;
};

function makeIndent(indent: number) {
    return Array(indent).join(' ');
}

function writeMap(map: ast.Map, indent: number): string[] {
    let ret = [];
    for (const item of map.items) {
        if (item.type === 'PAIR') {
            if (item.commentBefore) {
                for (const line of item.commentBefore.split('\n')) {
                    ret.push(`${makeIndent(indent)}# ${line}`);
                }
            }
            const inlineComment = item.comment ? ` ${item.comment}` : '';
            ret.push(`${makeIndent(indent)}${item.key}:${inlineComment}`);
        }
    }
    return ret;
}

function writeNode(node: ast.AstNode, indent: number) {
    let ret = [];
    if (node.type === 'MAP') {
        ret = ret.concat(writeMap(node, indent));
    }
    return ret;
}

function writeDocument(doc: cst.Document, indent: number) {
    let ret = [];
    for (const content of doc.contents) {
        if (content.type === 'COMMENT') {
            ret.push(`${makeIndent(indent)}#${content.comment}`);
        } else if (content.type === 'MAP') {
            let str = '';
            for (const item of content.items) {
                if (item.type === 'PLAIN') {
                    str += item.strValue;
                }
                if (item.type === 'MAP_VALUE') {

                }
            }
            ret.push(str);
        }
    }
    return ret;
}

export function writeYaml(cst: ParsedCST) {
    let ret = [];
    for (const doc of cst) {
        ret = ret.concat(writeDocument(doc, 0));
    }
    return ret.join('\n');
}

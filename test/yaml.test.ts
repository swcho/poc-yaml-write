

import { parse, parseDocument, ast, parseCST } from 'yaml';
import { writeYaml } from '../src/writeyaml';

const FIX_ARRAY = `
# comments document

# comments above fruits
fruits: # comment inline fruits
    # comment before apple
    - Apple # comment inline apple
    # comments
    - Orange # inline comments
    - Strawberry

depth1:
    # comment for dept2
    depth2:

        # comment for dept3 - 1

        # comment for dept3 - 2
        depth3:
            - item1
            - item2
            - item3
`

describe('test yaml', () => {
    // https://eemeli.org/yaml
    // https://github.com/mulesoft-labs/yaml-ast-parser/issues/27

    // https://github.com/andxu/yaml-parser
    it('yaml parse', () => {
        // const doc = parseDocument(FIX_ARRAY, { keepCstNodes: true, keepNodeTypes: true, keepBlobsInJSON: true });
        const docs = parseCST(FIX_ARRAY);
        // doc.contents.
        docs[0].contents[2]['items'][1]['node']['items'][0]['rawValue'] = '- Rotten Apple'
        const str = docs.toString();
        const str2 = writeYaml(docs);
        console.log(str);
        console.log(str2);
    });

})
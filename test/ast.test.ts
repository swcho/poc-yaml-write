

import { safeLoad, dump } from 'yaml-ast-parser';

const FIX_ARRAY = `# A list of tasty fruits
fruits:
  - Apple
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

describe('ast parser', () => {

    it('ast parser test', () => {
        const doc = safeLoad(FIX_ARRAY);
        const str = dump(doc, {});
        console.log(doc, str);
    });

})
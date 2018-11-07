
import { load_fixture_str } from './utils';
import { mergeYaml } from '../mergeYaml';
import { expect } from 'chai';

const FIX_ARRAY = `# A list of tasty fruits
fruits:
    - Apple
    - Orange
    - Strawberry
    - Mango
`

describe('writeYaml', () => {
    it ('handles array', () => {
        const [org, json, converted] = load_fixture_str(FIX_ARRAY);
        const yamlMerged = mergeYaml(org, converted, converted);
        expect(yamlMerged).eq(org);
    });

});

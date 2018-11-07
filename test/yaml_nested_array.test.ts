
import { load_fixture_str } from './utils';
import { mergeYaml } from '../mergeYaml';
import { expect } from 'chai';
import { dump } from 'js-yaml';

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

const FIX_ARRAY_PUSH_LAST = `# A list of tasty fruits
fruits:
  - Apple
  - Orange
  - Strawberry
  - Mango
  - Grape
`

const FIX_ARRAY_UNSHIFT = `# A list of tasty fruits
fruits:
  - Grape
  - Apple
  - Orange
  - Strawberry
  - Mango
`

describe('yaml_nested_array', () => {
    it ('handles array', () => {
        const [org, json, converted] = load_fixture_str(FIX_ARRAY);
        const yamlMerged = mergeYaml(org, converted, converted);
        expect(org).eq(yamlMerged);
    });

    it ('handles array push last', () => {
        const [org, json, converted] = load_fixture_str(FIX_ARRAY);
        json.fruits.push('Grape');
        const yamlMerged = mergeYaml(org, converted, dump(json));
        expect(FIX_ARRAY_PUSH_LAST).eq(yamlMerged);
    });

    it ('handles array insert first', () => {
        const [org, json, converted] = load_fixture_str(FIX_ARRAY);
        json.fruits.unshift('Grape');
        const yamlMerged = mergeYaml(org, converted, dump(json));
        expect(FIX_ARRAY_UNSHIFT).eq(yamlMerged);
    });
});

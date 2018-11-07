
import { load_fixture_str } from './utils';
import { mergeYaml } from '../mergeYaml';
import { expect } from 'chai';
import { dump } from 'js-yaml';

const FIX_ARRAY = `# A list of tasty fruits
fruits:
  - Apple
  - Orange
  - Strawberry
  - Mango
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
describe('yaml_array', () => {
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

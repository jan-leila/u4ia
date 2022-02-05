const assert = require('assert');
const u4ia = require('../src/index.js');

const { get_pronouns, get_code } = u4ia;

let codes = [ ...Array.from({ length: 16 }, (v, i) => i), undefined ];

let pronouns = codes.map((code) => {
    return [ get_pronouns(code), code];
});

describe('decode', () => {
    it('all codes should return a unique set of pronouns', () => {
        let all_unique = pronouns.every(([ pronoun ], i) => {
            return pronouns.indexOf(pronoun) !== i;
        });
        assert(all_unique, JSON.stringify(pronouns));
    });
});

describe('encode', () => {
    it('all pronouns should decode into the code that generated them', () => {
        let encoded = pronouns.map(([ pronoun, code ]) => {
            return {
                pronoun,
                code,
                encoded_value: get_code(pronoun),
            };
        });
        let codes_match = encoded.every(({ encoded, code }) => {
            return encoded === code;
        });
        assert(codes_match, JSON.stringify(encoded));
    });
});

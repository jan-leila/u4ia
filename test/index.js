const assert = require('assert');
const u4ia = require('../src/index.js');

const { get_pronouns, get_code, code_builder } = u4ia;

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
    it('code_builder should return proper codes', () => {
        let codes = [
            [ "she", 0 ],
            [ "her", 0 ],
            [ "he", 1 ],
            [ "him", 1 ],
            [ "they", 2 ],
            [ "them", 2 ],
            [ "any", 3 ],
            [ "all", 3 ],
        ];
        assert(codes.every(([ pronoun, code ]) => {
            return code_builder(pronoun) === code;
        }));
    });

    it('all pronouns should decode into the code that generated them', () => {
        let encoded = pronouns.map(([ pronoun, code ]) => {
            return {
                pronoun,
                code,
                encoded_value: get_code(pronoun),
            };
        });
        let codes_match = encoded.every(({ encoded_value, code }) => {
            return encoded_value === code;
        });
        assert(codes_match, JSON.stringify(encoded));
    });
    it('should convert pronouns in string array format', () => {
        let encoded = pronouns.map(([pronoun, code]) => {
            return {
                pronoun,
                code,
                encoded_value: get_code(pronoun?pronoun.split('/') : undefined),
            };
        });
        let codes_match = encoded.every(({ encoded_value, code }) => {
            return encoded_value === code;
        });
        assert(codes_match, JSON.stringify(encoded)); 
    });
    it('should convert pronouns in code array format', () => {
        let encoded = pronouns.map(([pronoun, code]) => {
            return {
                pronoun,
                code,
                encoded_value: get_code(pronoun ? pronoun.split('/').map(code_builder) : undefined),
            };
        });
        let codes_match = encoded.every(({ encoded_value, code }) => {
            return encoded_value === code;
        });
        assert(codes_match, JSON.stringify(encoded));
    });
});

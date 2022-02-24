const assert = require('assert');
const u4ia = require('../src/index.js');

const { get_arrangement } = require('../src/arrangement.js');

const { get_pronouns, get_code, Localization } = u4ia;

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
                encoded_value: get_code(pronoun? pronoun.split('/') : undefined),
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
                encoded_value: get_code(pronoun? get_arrangement(get_code(pronoun)): undefined),
            };
        });
        let codes_match = encoded.every(({ encoded_value, code }) => {
            return encoded_value === code;
        });
        assert(codes_match, JSON.stringify(encoded));
    });
});

describe('localization', () => {
    it('should support string input for pronouns', () => {
        let localization = new Localization([
            'a',
            'b',
            'c',
        ]);
        let matches = pronouns.every((pronoun) => {
            let code = get_code(pronoun);
            let new_pronoun = localization.get_pronouns(code);
            return pronoun !== new_pronoun && code === localization.get_code(new_pronoun);
        });
        assert(matches);
    });

    // TODO: tests for localization options
});

describe('expandability', () => {
    let counter = Array.from({ length: 7 }, (_, i) => i);
    let characters = counter.map((i) => String.fromCharCode(97 + i));
    it('all localizations should return the same pronouns for the same code', () => {
        let localizations = counter.map((i) => new Localization(characters.slice(0, i + 1)));
        let all_match = (() => {
            let max = localizations[localizations.length - 1].get_size();
            for(let i = 0; i < max; i++){
                if(i > localizations[0].get_size()){
                    localizations.shift();
                }
                let results = localizations.map((localization) => localization.get_pronouns(i));
                let all_match = results.every((value, _, arr) => {
                    return arr.every((_value) => {
                        return value === _value;
                    });
                });
                if (!all_match) return false;
            }
            return true;
        })();
        assert(all_match);
    });
    
    it('all localizations should return the same code for the same pronouns', () => {
        let localizations = counter.map((i) => new Localization(characters.slice(0, i + 1)));
        let all_match = (() => {
            let max = localizations[localizations.length - 1].get_size();
            for (let i = 0; i < max; i++) {
                if (i > localizations[0].get_size()) {
                    localizations.shift();
                }
                let results = localizations.map((localization) => localization.get_code(localization.get_pronouns(i)));
                let all_match = results.every((value, _, arr) => {
                    return arr.every((_value) => {
                        return value === _value;
                    });
                });
                if (!all_match) return false;
            }
            return true;
        })();
        assert(all_match);
    });

})
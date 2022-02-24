
const { get_arrangement, get_code, get_arrangement_size } = require('./arrangement.js');

class Localization {
    constructor(localization, opts){
        opts = opts || {};
        let {
            base = [ '' ],
            default_value = undefined,
            deliminator = '/',
            count = 2,
        } = opts;

        this._localization = localization.map((row) => {
            if (typeof row === 'string') return row.split(deliminator);
            return row;
        });

        this._opts = opts;
        this._base = Array.isArray(base)? base : [ base ];
        this._default_value = default_value;
        this._deliminator = deliminator;
        this._count = count;
        this._max_code = get_arrangement_size(this._localization.length) - 1;
    }

    derive(localization, opts){
        if(opts === undefined){
            localization = opts;
            opts = {};
        }
        return new Localization([ ...this._localization, ...localization ], { ...this._opts, ...opts });
    }

    get_size() {
        return this._max_code;
    }

    get_pronouns(code){
        if(code == undefined || code > this._max_code) return this._default_value;
        if(code === 0) return this._base[0];
        let sub_codes = get_arrangement(code);
        if(sub_codes.length === 1 && this._localization[sub_codes[0]].length > 1){
            sub_codes.push(...Array.from({ length: this._count - 1 }, () => sub_codes[0]));
        }
        let pronouns = sub_codes.map((sub_code, i, arr) => {
            let row = this._localization[sub_code];
            let column = Math.min(i - arr.indexOf(sub_code), row.length - 1);
            return row[column];
        }).join(this._deliminator);
        return pronouns;
    }

    get_code(pronouns){
        if(pronouns == this._default_value) return undefined;
        if(
            (Array.isArray(pronouns) && pronouns.length === 0) || 
            (Array.isArray(pronouns)? pronouns:[pronouns]).some((pronoun) => {
                return this._base.some((base) => base === pronoun);
            })
        ) return 0;
        if(typeof pronouns === 'string'){
            pronouns = pronouns.split(this._deliminator);
        }
        let sub_codes = pronouns.map((pronoun) => {
            if(typeof pronoun === 'number') return pronoun;
            let sub_code = this._localization.findIndex((values) => {
                return values.some((value) => {
                    return pronoun === value;
                });
            });
            if(sub_code === -1) return undefined;
            return sub_code;
        });
        if(sub_codes.some((sub_code) => sub_code === undefined)) return undefined;
        sub_codes = sub_codes.filter((c, i, arr) => arr.indexOf(c) === i);
        return get_code(sub_codes);
    }
}

module.exports = Localization;
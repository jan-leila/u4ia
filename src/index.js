
class Localization {
    static arrangement_sizes = [ 1, 2, 5, 16, 65, 326, 1957, 13700, 109601, 986410, 9864101, 108505112, 1302061345 ];

    static get_arrangement(index, size) {
        let i = 0;
        let out = new Array(size);
        let set = Array.from({ length: size }, (v, i) => i);

        while(index !== 0){
            index--;
            let next_size = this.arrangement_sizes[set.length - 1];
            out[i] = set.splice(Math.floor(index / next_size), 1)[0];
            i++;
            index %= next_size;
        }
        return out.filter((v) => v !== undefined);
    }

    constructor(localization){
        this._localization = localization.map((row) => {
            if(typeof row === 'string') return row.split('/');
            return row;
        });
    }

    _pronoun_builder(code, index) {
        let row = code === -1? this._localization[this._localization.length - 1] : this._localization[code];
        return row[Math.min(index, row.length - 1)];
    }

    _code_builder(pronoun){
        let code = this._localization.findIndex((values) => {
            return values.some((value) => {
                return pronoun === value;
            });
        });
        if(code === -1) return undefined;
        if(code === (this._localization.length - 1)) return -1;
        return code;
    }

    code_builder(pronoun){
        return this._code_builder(pronoun);
    }

    get_pronouns(code){
        if(code == undefined) return undefined;

        let codes = Localization.get_arrangement(code, this._localization.length - 1);
        if(codes.length === 0) codes.push(-1);
        codes = [ ...codes, codes[0] ].slice(0, Math.max(codes.length, 2));

        return codes.map((v, i) => {
            return this._pronoun_builder(v, i)
        }).join('/');
    }

    _get_code(pronouns){
        if(pronouns.some((v) => v === -1)) return 0;

        let size = Localization.arrangement_sizes[this._localization.length - 1];
        for(let i = 0; i < size; i++){
            let test_codes = Localization.get_arrangement(i, this._localization.length - 1);
            if(test_codes.length === pronouns.length && pronouns.every((code, i) => {
                return test_codes[i] === code;
            })){
                return i;
            }
        }
    }

    get_code(pronouns){
        if(pronouns == undefined) return undefined;
        if(typeof pronouns === 'string'){
            pronouns = pronouns.split('/');
        }
        pronouns = pronouns.map((pronoun) => {
            if(typeof pronoun === 'string') return this._code_builder(pronoun);
            return pronoun;
        });

        pronouns = pronouns.filter((c, i, arr) => arr.indexOf(c) === i);
        if(pronouns.some((v) => v == undefined)) return undefined;
        return this._get_code(pronouns);
    }
}

const default_localization = new Localization([
    ['she', 'her'],
    ['he', 'him'],
    ['they', 'them'],
    ['any', 'all'],
]);

module.exports = {
    get_pronouns: (code) => {
        return default_localization.get_pronouns(code);
    },
    get_code: (pronoun) => {
        return default_localization.get_code(pronoun);
    },
    code_builder: (code) => {
        return default_localization.code_builder(code);
    },
    Localization,
}
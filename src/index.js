
const default_localization = [
    [ 'she', 'her' ],
    [ 'he', 'him' ],
    [ 'they', 'them' ],
    [ 'any', 'all' ],
]

function pronoun_builder(code, index, localization){
    return localization[code][Math.min(index, localization[code].length - 1)];
}

function code_builder(pronoun, localization = default_localization){
    return localization.findIndex((values) => {
        return values.some((value) => {
            return pronoun === value;
        });
    });
}

let arrangement_sizes = [ 1, 2, 5 ];

function get_arrangement(index){
    let out = [];
    let set = [ 0, 1, 2 ];
    while(index !== 0){
        index--;
        let next_size = arrangement_sizes[set.length - 1];
        out.push(set.splice(Math.floor(index / next_size), 1)[0]);
        index %= next_size;
    }
    return out;
}

// get pronoun string from code
function get_pronouns(code, localization = default_localization){
    if(code == undefined){
        return undefined;
    }
    let codes = get_arrangement(code);
    if(codes.length === 0) codes.push(3);
    codes = [ ...codes, codes[0] ].slice(0, Math.max(codes.length, 2));
    return codes.map((v, i) => {
        return pronoun_builder(v, i, localization)
    }).join('/');
}

// get code from pronoun string
function get_code(pronouns, localization = default_localization){
    if(pronouns == undefined) return undefined;
    if(typeof pronouns === 'string'){
        pronouns = pronouns.split('/');
    }
    if(typeof pronouns[0] === 'string'){
        pronouns = pronouns.map((v) => {
            return code_builder(v, localization)
        });
    }
    pronouns = pronouns.filter((c, i, arr) => arr.indexOf(c) === i);
    if(pronouns[0] === 3) return 0;
    for(let i = 0; i < 16; i++){
        let test_codes = get_arrangement(i);
        if(test_codes.length === pronouns.length && pronouns.every((code, i) => {
            return test_codes[i] === code;
        })){
            return i;
        }
    }
}

module.exports = {
    get_pronouns,
    get_code,
    code_builder: (v, l) => {
        return code_builder(v, Array.isArray(l)? l : undefined);
    },
}
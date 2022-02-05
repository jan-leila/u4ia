
let code_map = [
    [ 'she', 'her' ],
    [ 'he', 'him' ],
    [ 'they', 'them' ],
    [ 'any', 'all' ],
]
function pronoun_builder(code, index){
    return code_map[code][Math.min(index, 1)];
}

// get sub codes from code
function get_sub_codes(code){
    let codes = [ code % 3, undefined, undefined];
    codes[1] = code >= 3 ? (codes[0] + Math.floor(code / 3) % 2 + 1) % 3 : codes[0];
    codes[2] = code >= 9 ? (codes[0] * 2 - codes[1] + 3) % 3 : codes[1];
    return codes.filter((c, i, arr) => arr.indexOf(c) === i);
}

// get pronoun string from code
function get_pronouns(code){
    if(code == undefined){
        return undefined;
    }
    let codes = code === 15? [ 3 ]:get_sub_codes(code);
    codes = [ ...codes, codes[0] ].slice(0, Math.max(codes.length, 2));
    return codes.map(pronoun_builder).join('/');
}

// get code from pronoun string
function get_code(pronouns){

}

module.exports = {
    get_pronouns,
    get_code,
}
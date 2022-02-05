
let code_map = [
    [ 'she', 'her' ],
    [ 'he', 'him' ],
    [ 'they', 'them' ],
    [ 'any', 'all' ],
]

function pronoun_builder(code, index){
    return code_map[code][Math.min(index, 1)];
}

function code_builder(pronoun) {
    return code_map.findIndex((values) => {
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
function get_pronouns(code){
    if(code == undefined){
        return undefined;
    }
    let codes = get_arrangement(code);
    if(codes.length === 0) codes.push(3);
    codes = [ ...codes, codes[0] ].slice(0, Math.max(codes.length, 2));
    return codes.map(pronoun_builder).join('/');
}

// get code from pronoun string
function get_code(pronouns){
    if(pronouns == undefined) return undefined;
    let codes = pronouns.split('/').map(code_builder).filter((c, i, arr) => arr.indexOf(c) === i);
    if(codes[0] === 3) return 0;
    for(let i = 0; i < 16; i++){
        let test_codes = get_arrangement(i);
        if(test_codes.length === codes.length && codes.every((code, i) => {
            return test_codes[i] === code;
        })){
            return i;
        }
    }
}

module.exports = {
    get_pronouns,
    get_code,
}
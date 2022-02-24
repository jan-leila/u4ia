
const arrangement_sizes = [1, 2, 5, 16, 65, 326];

function get_arrangement_size(i) {
    if(i < 0) {
        return 0;
    }
    if(arrangement_sizes[i]) {
        return arrangement_sizes[i];
    }
    return arrangement_sizes[i] = i * get_arrangement_size(i - 1) + 1;
}

let arrangement_index = 0;
let arrangements = [[]];

function ensure_range(n) {
    while(n >= arrangements.length){
        let expansion = arrangements.map((arrangement) => {
            let expansions = new Array(arrangement.length + 1);
            for (let i = 0; i <= arrangement.length; i++) {
                let new_arrangement = [ ...arrangement ];
                new_arrangement.splice(i, 0, arrangement_index);
                expansions[i] = new_arrangement;
            }
            return expansions;
        }).flat();

        arrangements.push(...expansion);
        arrangement_index++;
    }
}

function get_arrangement(code) {
    ensure_range(code);
    return [ ...arrangements[code]];
}

function compaire_arrangements(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return a.every((v, i) => {
        return v === b[i];
    });
}

function get_code(arrangement) {
    let set = Math.max(...arrangement);
    let i = get_arrangement_size(set);
    let max = get_arrangement_size(set + 1);
    ensure_range(max);
    while (i < max) {
        if (compaire_arrangements(arrangement, arrangements[i])) return i;
        i++;
    }
}

module.exports = {
    get_arrangement,
    get_code,
    get_arrangement_size,
}
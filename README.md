
# u4ia

Library for encoding and decoding pronouns into a 4 bit value

usage:
```js
const { get_code, get_pronouns } = require('u4ia');

let code = get_code('she/her');
// code should be 1
console.log(code);

/* storing code to be used at a later time */

let pronouns = get_pronouns(code);

// pronouns should be she/her
console.log(pronouns);
```

Use built in localizations
```js
const { default_localization, localizations } = require('u4ia');
default_localization.get_code(...);
default_localization.get_pronouns(...);

// languge codes defined by ISO 639
let localization = localizations['en'] || localizations['zho'] || localizations['tok'];
localization.get_code(...);
localization.get_pronouns(...);
```

Define custom localization or pronouns (and make a pull request to add them to the project if you would like)
```js
const { Localization } = require('u4ia');
const custom_localization = new Localization([
    'a',
    'b/B',
    'c',
], {
    base: '?',
});

// use custom localization
custom_localization.get_code(...);
custom_localization.get_pronouns(...);
```

built in english pronouns:
| code  | pronouns      |
|-------|---------------|
| 0     | any/all       |
| 1     | she/her       |
| 2     | he/him        |
| 3     | he/she        |
| 4     | she/he        |
| 5     | they/them     |
| 6     | they/she      |
| 7     | she/they      |
| 8     | they/he       |
| 9     | he/they       |
| 10    | they/he/she   |
| 11    | he/they/she   |
| 12    | he/she/they   |
| 13    | they/she/he   |
| 14    | she/they/he   |
| 15    | she/he/they   |

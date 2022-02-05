
# u4ia

Library for encoding and decoding pronouns into a 4 bit value

usage:
```js
const u4ia = require('u4ia');

let code = u4ia.get_code('she/her');
// code should be 0
console.log(code);

/* storing code to be used at a later time */

let pronouns = u4ia.get_pronouns(code);

// pronouns should be she/her
console.log(pronouns);
```

supported pronouns:
| code | pronouns|
|------|---------|
| 0    | any/all  |
| 1    | she/her |
| 2    | she/him |
| 3    | she/him/them |
| 4    | she/them |
| 5    | she/them/him |
| 6    | he/him |
| 7    | he/her |
| 8    | he/her/them |
| 9    | he/them |
| 10   | he/them/her |
| 11   | they/them |
| 12   | they/her |
| 13   | they/her/him |
| 14   | they/him |
| 15   | they/him/her |

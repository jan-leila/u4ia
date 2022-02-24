const Localization = require('../localization.js');

const localization = new Localization([
    'she/her/hers',
    'he/him/his',
    'they/them/theirs',
], {
    base: ['any/all', 'any', 'all'],
});

module.exports = {
    en: localization,
    eng: localization,
}
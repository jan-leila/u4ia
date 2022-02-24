const Localization = require('../localization.js');

const localization = new Localization([
    'ona meli',
    'ona mije',
    'ona tonsi',
], {
    base: 'ona',
});

module.exports = {
    tok: localization,
}
const Localization = require('../localization.js');

const localization = new Localization([
    '她',
    '他',
    '他',
], {
    base: '他',
});

module.exports = {
    zh: localization,
    chi: localization,
    zho: localization,
}
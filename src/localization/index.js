
const english = require('./english.js');
const chinese = require('./chinese.js');
const toki_pona = require('./toki_pona');

module.exports = {
    ...english,
    ...chinese,
    ...toki_pona,
};
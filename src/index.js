const Localization = require('./localization');
const localizations = require('./localization/index.js');

const default_localization = localizations['en'];

module.exports = {
    Localization,
    localizations,
    default_localization,
    get_pronouns: (code) => {
        return default_localization.get_pronouns(code);
    },
    get_code: (pronoun) => {
        return default_localization.get_code(pronoun);
    },
}
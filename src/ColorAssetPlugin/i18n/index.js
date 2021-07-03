


import locales from './locales';

export const FALLBACK_LANG = 'en_US';

const i18n = {
    locales,
    get(key, params = {}, lang = FALLBACK_LANG) {
        var str = locales[lang][key] || locales[FALLBACK_LANG][key] || key || undefined;

        if (typeof str === 'function') {
            return str(params)
        } else {
            var newValue = str;

            if (key === newValue) {
                return key.split('.').pop();
            }

            Object.keys(params).forEach((key) => {
                const value = params[key];
                newValue = newValue.replace(new RegExp(`\{${key}\}`, 'ig'), value);
            })
            return newValue;
        }

    },

    hasKey(key, lang = FALLBACK_LANG) {
        return !!(locales[lang][key] || locales[FALLBACK_LANG][key]);
    }
}

export default i18n;
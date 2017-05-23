// app/translate/translation.ts
import { OpaqueToken } from '@angular/core';
// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_AM_NAME, LANG_AM_TRANS } from './lang-am';
// translation token
export var TRANSLATIONS = new OpaqueToken('translations');
// all traslations
export var dictionary = (_a = {},
    _a[LANG_EN_NAME] = LANG_EN_TRANS,
    _a[LANG_AM_NAME] = LANG_AM_TRANS,
    _a);
// providers
export var TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];
var _a;
//# sourceMappingURL=translations.js.map
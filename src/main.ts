import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
declare const require; // Use the require method provided by webpack

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Warning,
  providers: [
    { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Warning },
    { provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        console.log(locale);
        locale = locale || 'en'; // default to english if no locale provided
        return require(`raw-loader!./locale/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
}).catch(err => console.log(err));

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT, MissingTranslationStrategy } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
declare const require; // Use the require method provided by webpack

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
      { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Warning },
      { provide: LOCALE_ID, useValue: 'fr' },
      {
        provide: TRANSLATIONS,
        useFactory: (locale) => {
          console.log(locale);
          locale = locale || 'en'; // default to english if no locale provided
          return require(`raw-loader!../locale/messages.${locale}.xlf`);
        },
        deps: [LOCALE_ID]
      },
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      I18n
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { I18nDef } from '@ngx-translate/i18n-polyfill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxWrapperService {

  constructor(private translate: TranslateService) { }

  init() {
    this.translate.addLangs(['en', 'fr']);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available in browser, it will use the default
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  useLang(value) {
    this.translate.use(value);
  }

  getLangs(): Array<string> {
    return this.translate.getLangs();
  }

  currentLang(): string {
    return this.translate.currentLang;
  }

  i18n(message: I18nDef): Observable<string> {
    //this.i18n(message);
    // console.log(id, ' | ', message);
    return this.translate.stream(message.id);
    //return this.translate.stream(message.id);
  }
}

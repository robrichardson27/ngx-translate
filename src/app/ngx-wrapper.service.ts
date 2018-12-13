import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import "reflect-metadata";

@Injectable({
    providedIn: 'root'
})
export class NgxWrapperService {

    constructor(private translate: TranslateService) {
    }

    init() {
        this.translate.addLangs(['en', 'fr', 'es', 'jp']);
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available in browser, it will use the default
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|es|jp/) ? browserLang : 'en');
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

    stream(message: string, param?: any): Observable<string> {
        return this.translate.stream(message, {value: param});
    }
}


const formatMetadataKey = Symbol("@Translate");

export interface Translate {
    value: string,
    id: string,
    meaning?: string,
    description?: string,
}

export function Translate(formatString: Translate) {
    console.log(formatMetadataKey, formatString);
    return Reflect.metadata(formatMetadataKey, formatString);
}

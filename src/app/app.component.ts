import {Component, OnInit} from '@angular/core';
import {Translate, NgxWrapperService} from './ngx-wrapper.service';

@Component({
    selector: 'app-root',
    template: `
        <div>
            <label>
                {{ selectLanguage | async }}
                <select #langSelect (change)="ecoTranslate.useLang(langSelect.value)">
                    <option *ngFor="let lang of ecoTranslate.getLangs()" [value]="lang"
                            [selected]="lang === ecoTranslate.currentLang()">{{ lang }}
                    </option>
                </select>
            </label>
            <h3>{{ greetingMsg | async }}</h3>

        </div>
    `,
})
export class AppComponent implements OnInit {
    constructor(public ecoTranslate: NgxWrapperService) {
        ecoTranslate.init();
    }

    user = {
        name: 'Robert',
        age: '28'
    };

    @Translate({
        value: 'hello {{value}}',
        id: 'HOME.MESSAGE.ONE',
        meaning: 'say hello to a user',
        description: 'say hello to a user'
    })
    greetingMsg = this.ecoTranslate.stream('HOME.MESSAGE.ONE', this.user.name);
    @Translate({
        value: 'Please select a language',
        id: 'HOME.MESSAGE.TWO',
        meaning: 'command for a user',
        description: 'command for a user'
    })
    selectLanguage = this.ecoTranslate.stream('HOME.MESSAGE.TWO');

    ngOnInit() {
    }
}

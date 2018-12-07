import {Component, OnInit} from '@angular/core';
import {NgxWrapperService} from './ngx-wrapper.service';
import { I18nDef } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>{{ 'HELLO' | translate }}</h2>
      <label>
        {{ 'HOME.SELECT' | translate }}
        <select #langSelect (change)="wrapper.useLang(langSelect.value)">
          <option *ngFor="let lang of wrapper.getLangs()" [value]="lang" [selected]="lang === wrapper.currentLang()">{{ lang }}</option>
        </select>
      </label>
      <h2>{{ 'HOME.WELCOME' | translate:user }}</h2>
      <h3 [id]="message1.id">{{ message1 | async }}</h3>

    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(public wrapper: NgxWrapperService) {
    wrapper.init();
  }

  message = this.wrapper.i18n('TESTING.KEY');


  message1 = this.wrapper.i18n({
    value: 'This is the first warning message',
    id: 'HOME.MESSAGES.WARN1',
    meaning: 'this is a warning message',
    description: 'this is a description'
  });

  message1 = this.wrapper.i18n({
    value: 'This is the first warning message',
    id: 'testing an id',
    meaning: 'this is a warning message',
    description: 'this is a description'
  });

//  message = this.wrapper.i18n('THIS.TEST.TWO');
  //message2 = this.wrapper.i18n('loginWarningMessage');

  user = {
    name: "Robert",
    age: "28"
  };

  ngOnInit() {
  }
}

export class Test {
  constructor(public wrapper: NgxWrapperService) {
    wrapper.init();
  }

  message1 = this.wrapper.i18n({
    value: 'This is the first warning message',
    id: 'HOME.MESSAGES.WARN1',
    meaning: 'this is a warning message',
    description: 'this is a description'
  });

  message1 = this.wrapper.i18n({
    value: 'This is the first warning message',
    id: 'HOME.MESSAGES.WARN2',
    meaning: 'this is a warning message',
    description: 'this is a description'
  });

  message1 = this.wrapper.i18n({
    value: 'This is the first warning message',
    id: 'testing an id',
    meaning: 'this is a warning message',
    description: 'this is a description'
  });

}

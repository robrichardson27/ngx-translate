import {NgxWrapperService, Translate} from "../../../../ngx-wrapper.service";
import {Observable} from "rxjs";

export class Test {
    constructor(public ecoTranslate: NgxWrapperService) {
        ecoTranslate.init();
    }

    @Translate({
        value: 'hello test',
        id: 'TEST.MESSAGE.ONE',
        meaning: 'say hello to a user',
        description: 'say hello to a user'
    })
    message1: Observable<string> = this.ecoTranslate.stream('HOME.MESSAGE.ONE');
}
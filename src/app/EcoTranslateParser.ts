import {Injectable} from '@angular/core';
import {TranslateParser} from '@ngx-translate/core';

export interface I18nLocation {
    sourcefile: string,
    linenumber: number
}

export interface I18nDef {
    target: string,
    value: string,
    id: string,
    meaning: string,
    description: string,
    location: I18nLocation
}

@Injectable()
export class EcoTranslateParser extends TranslateParser {
    templateMatcher: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

    public interpolate(expr: string | Function, params?: any): string {
        let result: string;

        if (typeof expr === 'string') {
            result = this.interpolateString(expr, params);
        } else if (typeof expr === 'function') {
            result = this.interpolateFunction(expr, params);
        } else {
            // this should not happen, but an unrelated TranslateService test depends on it
            result = expr as string;
        }
        return result;
    }

    getValue(target: any, key: string): any {
        let keys = key.split('.');
        key = '';
        do {
            key += keys.shift();
            if (this.isDefined(target) && this.isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            } else if (!keys.length) {
                target = undefined;
            } else {
                key += '.';
            }
        } while (keys.length);

        if (this.isDefined(target) && (this.isDefined(target.target) && this.isDefined(target.value))) {
            target = this.extractString(target);
        }

        return target;
    }

    private extractString(target: I18nDef): string {
        return target.target ? target.target : target.value;
    }

    private interpolateFunction(fn: Function, params?: any) {
        return fn(params);
    }

    private interpolateString(expr: string, params?: any) {
        if (!params) {
            return expr;
        }

        return expr.replace(this.templateMatcher, (substring: string, b: string) => {
            let r = this.getValue(params, b);
            return this.isDefined(r) ? r : substring;
        });
    }

    private isDefined(value: any): boolean {
        return typeof value !== 'undefined' && value !== null;
    }
}

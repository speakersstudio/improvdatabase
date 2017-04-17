import { Injectable, NgModule } from "@angular/core";

// https://github.com/marcj/angular2-localstorage

const KEY_PREFIX = 'improvplus';

export class WebStorageUtility {
    static generateStorageKey(key: string): string {
        return `${KEY_PREFIX}_${key}`;
    }

    static get(storage: Storage, key: string): any {
        let storageKey = WebStorageUtility.generateStorageKey(key);
        let value = storage.getItem(storageKey);
        return WebStorageUtility.getGettable(value);
    }

    static set(storage: Storage, key: string, value: any): void {
        let storageKey = WebStorageUtility.generateStorageKey(key);
        storage.setItem(storageKey, WebStorageUtility.getSettable(value));
    }

    static remove(storage: Storage, key: string): void {
        let storageKey = WebStorageUtility.generateStorageKey(key);
        storage.removeItem(storageKey);
    }

    private static getSettable(value: any): string {
        return typeof value === 'string' ? value : JSON.stringify(value);
    }

    private static getGettable(value: string): any {
        try {
            return JSON.parse(value);
        } catch(e) {
            return value;
        }
    }
}

export class WebStorageService {
    constructor(private storage: Storage) {}

    get(key: string): any {
        return WebStorageUtility.get(this.storage, key);
    }

    set(key: string, value: any): void {
        WebStorageUtility.set(this.storage, key, value);
    }

    remove(key: string): void {
        WebStorageUtility.remove(this.storage, key);
    }

    clear(): void {
        this.storage.clear();
    }
}

@Injectable()
export class LocalStorageService extends WebStorageService {
    constructor() {
        super(localStorage);
    }
}

@Injectable()
export class SessionStorageService extends WebStorageService {
    constructor() {
        super(sessionStorage);
    }
}

export function LocalStorage(key?: string) {
    return WebStorage(localStorage, key);
}

export function SessionStorage(key?: string) {
    return WebStorage(sessionStorage, key);
}

// let cache = {};

export let WebStorage = (webStorage: Storage, key: string) => {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;

        let storageKey = WebStorageUtility.generateStorageKey(key);
        let storedValue = WebStorageUtility.get(webStorage, key);

        Object.defineProperty(target, propertyName, {
            get: function() {
                return WebStorageUtility.get(webStorage, key);
            },
            set: function(value: any) {
                // I don't get the purpose of this, other than to break this code
                // if (!cache[key]) {
                //     if (storedValue === null) {
                //         WebStorageUtility.set(webStorage, key, value);
                //     }

                //     cache[key] = true;
                //     return;
                // }

                WebStorageUtility.set(webStorage, key, value);
            }
        })
    }
}

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})
export class WebStorageModule {}
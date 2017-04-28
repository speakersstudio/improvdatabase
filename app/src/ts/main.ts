import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module/app.module';

import { CONFIG_TOKEN } from './constants';

fetch('/config').then(response => {
    response.json().then(configData => {
        const platform = platformBrowserDynamic([{
            provide: CONFIG_TOKEN, useValue: configData
        }]);
        platform.bootstrapModule(AppModule);
    });
})


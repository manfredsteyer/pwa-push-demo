import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {FlugSuchenComponent} from './flugsuchen.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


var service = [
    HTTP_PROVIDERS
];

bootstrap(FlugSuchenComponent, service);

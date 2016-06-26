import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, URLSearchParams, Headers} from '@angular/http';
import { Buchung} from './buchung';
import { BuchungenDoc} from './buchungen-doc';
import { BuchungService} from './buchung.service';
import { BuchungsStatusPipe} from './buchungs-status.pipe';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';


const APP_MD_DIRECTIVES = [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_ICON_DIRECTIVES
];

@Component({
    selector: 'flug-suchen', // <my-app></my-app>
    templateUrl: 'app/flugsuchen.component.html',
    styleUrls: ['app/flugsuchen.component.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    directives: [APP_MD_DIRECTIVES],
    providers: [BuchungService, MdIconRegistry],
    pipes: [BuchungsStatusPipe]
})
export class FlugSuchenComponent implements OnInit {
    
    public buchungen: Array<Buchung> = [];
    
    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private buchungService: BuchungService) {
    }
    
    ngOnInit() {
        this.setupPushNotifications();
        this.syncData();
    }
    
    syncData() {
        let hasPendingRequest = true;
        let that = this;

        this.buchungService.sync().then((b: Buchung[]) => {
            hasPendingRequest = false;
            that.buchungen = b;        
            that.changeDetectionRef.detectChanges();
        });
        
        this.buchungService.fetchLocal().then((b: BuchungenDoc) => {
            if (!hasPendingRequest) return;
            if (!b) return;
            that.buchungen = b.buchungen;
            that.changeDetectionRef.detectChanges();
        });
        
    }
    
    requestUpload() {
        
        let nav:any = navigator;
        
        if ('serviceWorker' in nav && 'SyncManager' in window) {
            nav.serviceWorker
                .ready
                .then(reg => {
                    return reg.sync.register('upload');   
                })
                .catch(_ => {
                    return this.buchungService.upload();   
                });
        } 
        else {
            this.buchungService.upload();            
        }
        
    }

    setupPushNotifications() {

        let nav:any = navigator;

        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
            nav.serviceWorker.ready.then(function(reg) {
                console.log(':^)', reg);
                reg.pushManager.subscribe({
                    userVisibleOnly: true
                }).then(function(sub) {
                    console.log('endpoint:', sub.endpoint);
                });
            }).catch(function(error) {
                console.log(':^(', error);
            });
        }
    
    }
    
    checkin(b: Buchung) {
        b.buchungsStatus = 1;
        b.isDirty = true;
        this.buchungService.save(this.buchungen);
        this.requestUpload();
    }

    boarding(b: Buchung) {
        b.buchungsStatus = 2;
        b.isDirty = true;
        this.buchungService.save(this.buchungen);
        this.requestUpload();
    }

    booked(b: Buchung) {
        b.buchungsStatus = 0;
        b.isDirty = true;
        this.buchungService.save(this.buchungen);
        this.requestUpload();
    }
    
}
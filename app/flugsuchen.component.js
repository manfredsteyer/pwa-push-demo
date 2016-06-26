"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var buchung_service_1 = require('./buchung.service');
var buchungs_status_pipe_1 = require('./buchungs-status.pipe');
var card_1 = require('@angular2-material/card');
var button_1 = require('@angular2-material/button');
var toolbar_1 = require('@angular2-material/toolbar');
var sidenav_1 = require('@angular2-material/sidenav');
var list_1 = require('@angular2-material/list');
var icon_1 = require('@angular2-material/icon');
var APP_MD_DIRECTIVES = [
    card_1.MD_CARD_DIRECTIVES,
    button_1.MD_BUTTON_DIRECTIVES,
    toolbar_1.MD_TOOLBAR_DIRECTIVES,
    sidenav_1.MD_SIDENAV_DIRECTIVES,
    list_1.MD_LIST_DIRECTIVES,
    icon_1.MD_ICON_DIRECTIVES
];
var FlugSuchenComponent = (function () {
    function FlugSuchenComponent(changeDetectionRef, buchungService) {
        this.changeDetectionRef = changeDetectionRef;
        this.buchungService = buchungService;
        this.buchungen = [];
    }
    FlugSuchenComponent.prototype.ngOnInit = function () {
        this.setupPushNotifications();
        this.syncData();
    };
    FlugSuchenComponent.prototype.syncData = function () {
        var hasPendingRequest = true;
        var that = this;
        this.buchungService.sync().then(function (b) {
            hasPendingRequest = false;
            that.buchungen = b;
            that.changeDetectionRef.detectChanges();
        });
        this.buchungService.fetchLocal().then(function (b) {
            if (!hasPendingRequest)
                return;
            if (!b)
                return;
            that.buchungen = b.buchungen;
            that.changeDetectionRef.detectChanges();
        });
    };
    FlugSuchenComponent.prototype.requestUpload = function () {
        var _this = this;
        var nav = navigator;
        if ('serviceWorker' in nav && 'SyncManager' in window) {
            nav.serviceWorker
                .ready
                .then(function (reg) {
                return reg.sync.register('upload');
            })
                .catch(function (_) {
                return _this.buchungService.upload();
            });
        }
        else {
            this.buchungService.upload();
        }
    };
    FlugSuchenComponent.prototype.setupPushNotifications = function () {
        var nav = navigator;
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
            nav.serviceWorker.ready.then(function (reg) {
                console.log(':^)', reg);
                reg.pushManager.subscribe({
                    userVisibleOnly: true
                }).then(function (sub) {
                    console.log('endpoint:', sub.endpoint);
                });
            }).catch(function (error) {
                console.log(':^(', error);
            });
        }
    };
    FlugSuchenComponent.prototype.checkin = function (b) {
        b.buchungsStatus = 1;
        b.isDirty = true;
        this.buchungService.save(this.buchungen);
        this.requestUpload();
    };
    FlugSuchenComponent.prototype.boarding = function (b) {
        b.buchungsStatus = 2;
        b.isDirty = true;
        this.buchungService.save(this.buchungen);
        this.requestUpload();
    };
    FlugSuchenComponent.prototype.booked = function (b) {
        b.buchungsStatus = 0;
        b.isDirty = true;
        this.buchungService.save(this.buchungen);
        this.requestUpload();
    };
    FlugSuchenComponent = __decorate([
        core_1.Component({
            selector: 'flug-suchen',
            templateUrl: 'app/flugsuchen.component.html',
            styleUrls: ['app/flugsuchen.component.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
            directives: [APP_MD_DIRECTIVES],
            providers: [buchung_service_1.BuchungService, icon_1.MdIconRegistry],
            pipes: [buchungs_status_pipe_1.BuchungsStatusPipe]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, buchung_service_1.BuchungService])
    ], FlugSuchenComponent);
    return FlugSuchenComponent;
}());
exports.FlugSuchenComponent = FlugSuchenComponent;
//# sourceMappingURL=flugsuchen.component.js.map
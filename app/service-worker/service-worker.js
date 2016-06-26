"use strict";
var core_1 = require('@angular/core');
var buchung_service_1 = require('../buchung.service');
console.debug("starting service-worker");
var PROVIDERS = [
    buchung_service_1.BuchungService
];
var injector = core_1.ReflectiveInjector.resolveAndCreate(PROVIDERS);
var bs = injector.get(buchung_service_1.BuchungService);
var context = self;
context.addEventListener('sync', function (event) {
    console.debug("Service Worker: sync, tag=" + event.tag);
    if (event.tag == 'upload') {
        event.waitUntil(bs.upload().then(function (_) { return console.debug('background-upload finished'); }));
    }
});
context.addEventListener('push', function (event) {
    console.log('Push message', event);
    var title = 'Aktualisierte Daten';
    event.waitUntil(bs.sync().then(function (p) { return context.registration.showNotification(title, {
        body: 'Ihre Daten wurden aktualisiert',
        icon: '/images/touch/icon-128x128.png',
        tag: 'my-tag'
    }); }));
});
self.addEventListener('notificationclick', function (event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'http://localhost:8080';
    event.waitUntil(clients.matchAll({
        type: 'window'
    })
        .then(function (windowClients) {
        console.debug("win-count: " + windowClients.length);
        for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            console.debug(" > client-url: " + client.url + ", url: " + url);
            var clientUrl = client.url;
            if (clientUrl.startsWith(url) && 'focus' in client) {
                return client.focus();
            }
        }
        if (clients.openWindow) {
            return clients.openWindow(url);
        }
    }));
});
//# sourceMappingURL=service-worker.js.map
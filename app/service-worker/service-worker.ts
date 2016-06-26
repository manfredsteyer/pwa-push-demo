import { ReflectiveInjector } from '@angular/core';
import { BuchungService } from '../buchung.service';


console.debug("starting service-worker");

const PROVIDERS = [
    BuchungService
];

let injector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
let bs:BuchungService = injector.get(BuchungService);

var context:any = self;

context.addEventListener('sync', function(event) {
  console.debug("Service Worker: sync, tag=" + event.tag);
  if (event.tag == 'upload') {
    event.waitUntil(bs.upload().then(_ => console.debug('background-upload finished')));
  }
});

context.addEventListener('push', function(event: any) {
  console.log('Push message', event);
  var title = 'Aktualisierte Daten';
  event.waitUntil(bs.sync().then(p => context.registration.showNotification(title, {
        body: 'Ihre Daten wurden aktualisiert',
        icon: '/images/touch/icon-128x128.png',
        tag: 'my-tag'
      })));
});

declare var clients: any;

self.addEventListener('notificationclick', function(event: any) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'http://localhost:8080';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            console.debug("win-count: " + windowClients.length);
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                console.debug(" > client-url: " + client.url + ", url: " + url);
                let clientUrl: string = client.url;
                if ( clientUrl.startsWith(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
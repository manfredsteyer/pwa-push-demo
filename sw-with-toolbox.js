importScripts('/node_modules/sw-toolbox/sw-toolbox.js');
var context = self;
toolbox.options.debug = true;
toolbox.precache([
    '/',
    '/app/flugsuchen.component.css',
    '/app/flugsuchen.component.html',
    '/app/flugsuchen.component.js',
    '/app/navbar.component.html',
    '/app/navbar.component.js',
    '/app/main.js',
    '/img/notfound.png'
]);
toolbox.router.get('/img/:imgname', function (request, values, options) {
    return toolbox.cacheFirst(request)
        .catch(function () { return toolbox.cacheOnly(new Request("/img/notfound.png")); });
});
toolbox.router.get('/(.*)', toolbox.networkFirst, { origin: 'http://www.angular.at' });
toolbox.router.default = toolbox.cacheFirst;
context.addEventListener('install', function (event) { return event.waitUntil(context.skipWaiting()); });
context.addEventListener('activate', function (event) { return event.waitUntil(context.clients.claim()); });
/*

declare var caches: any;
declare var fetch: any;



const CACHE_NAME = 'flugapp-v15';
const API_BASE_URL = 'http://www.angular.at/api/';
const CACHE_FILES = [
        '/',
        '/app/flugsuchen.component.css',
        '/app/flugsuchen.component.html',
        '/app/flugsuchen.component.js',
        '/app/navbar.component.html',
        '/app/navbar.component.js',
        '/app/main.js',
        '/app/service-worker-manager.js',
        '/node_modules/es6-shim/es6-shim.min.js',
        '/node_modules/systemjs/dist/system-polyfills.js',
        '/node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
        '/node_modules/angular2/bundles/angular2-polyfills.js',
        '/node_modules/systemjs/dist/system.src.js',
        '/node_modules/rxjs/bundles/Rx.js',
        '/node_modules/angular2/bundles/angular2.dev.js',
        '/node_modules/angular2/bundles/http.dev.js',
        '/node_modules/bootstrap/dist/css/bootstrap.css',
        'http://www.angular.at/api/buchung?passagierId=1'
      ];

context.addEventListener('install', function(e:any) {
  e.waitUntil(fillCache());
});

context.addEventListener('activate', function(e) {
  e.waitUntil(clearOldCaches());
});

context.addEventListener('fetch', function(event: any) {
  event.respondWith(processRequest(event.request));
});

function fillCache() {
   
    return caches.open(CACHE_NAME)
                 .then(cache => cache.addAll(CACHE_FILES))
                 .then(() => context.skipWaiting());
    
}

function clearOldCaches() {
  
    return caches.keys()
                 .then(keyList => Promise.all(keyList.map(key => {
                    if (key != CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', key);
                        return caches.delete(key);
                    }
                  })));
}

function processRequest(request) {
  if (request.url.startsWith(API_BASE_URL)) {
    return fromNetworkFallingBackToCache(request);
  }
  else {
    return fromCacheFallingBackToNetwork(request);
  }
}

function fromCacheFallingBackToNetwork(request) {
    return caches.match(request)
                 .then((response: any) => {
                    if (response) {
                        console.debug('fetch from cache: ' + request.url);
                        return response;
                    }
                    else {
                        console.warn('fallback to network: ' + request.url);
                        return fetch(request);
                    }
                 });
}
 
function fromNetworkFallingBackToCache(request) {
  return fetch(request)
          .then(function(response) {
             console.debug('fetch from network: ' + request.url);
             return putIntoCache(request, response);
          })
          .catch(function() {
            console.warn('fallback to cache: ' + request.url);
            return caches.match(request);
          });
}


function putIntoCache(request, response) {
  return caches.open(CACHE_NAME)
               .then(cache => {
                    cache.put(request, response.clone());
                    return response;
                });
}

function logCacheHit(foundInCache, url) {
  
}

*/ 
//# sourceMappingURL=sw-with-toolbox.js.map
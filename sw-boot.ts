// Libs
importScripts('node_modules/sw-toolbox/sw-toolbox.js');
importScripts('node_modules/pouchdb/dist/pouchdb.js');

// Reflect & SystemJS
importScripts('node_modules/reflect-metadata/Reflect.js');
importScripts('node_modules/systemjs/dist/system.src.js');
importScripts('systemjs.config.js');

System.import('app/service-worker/service-worker')
      .catch(err => console.error(err));



 
import {Buchung} from './buchung';
import {BuchungenDoc} from './buchungen-doc';
import {Injectable } from '@angular/core';

const PASSAGIER_ID = "1";
//const URL = "/data/buchungen.json";
const URL = "http://www.angular.at/api/buchung";

const db = new PouchDB("buchungenDb");

@Injectable()
export class BuchungService {


    public sync(): Promise<Buchung[]> {
        var that = this;
        return this.upload().then(() => {
            return that.download();
        });
    }
    
    public download(): Promise<Buchung[]> {
        
        return this.fetchOnline()
                    .then(buchungen => {
                        return this.save(buchungen).then(() => buchungen);
                    });
    }
    
    public upload(): Promise<any> {
        
        let promises = [];
        
        return this.fetchLocal().then( (buchungen) => {
           
            if (!buchungen) return Promise.resolve(null);
           
            let method = "PUT";
            let mode = "CORS";
            let headers = new Headers();
            headers.set('Content-Type', 'text/json');
           
           var promises = buchungen.buchungen.filter(b => b.isDirty)
                                   .map(b => fetch(URL, {method, headers, /*mode,*/ body: JSON.stringify(b)}));
                                                 
           if (!promises) return Promise.resolve(null);
                                                              
           return Promise.all(promises);

        });
        
    }

    public fetchOnline(): Promise<Buchung[]> {
        
        // let search = new URLSearchParams();
        // search.set('passagierId', PASSAGIER_ID);
        
        // let headers = new Headers();
        // headers.set('Accept', 'text/json'); 
        
        let url = URL + "?passagierId=" + encodeURIComponent(PASSAGIER_ID);

        let headers = new Headers();
        headers.set('Accept', 'text/json');
        
        let method = "GET";
        let mode = "CORS";

        return fetch(url, {method, headers/*, mode*/ })
                .then(r => r.json());

    }
 
    public fetchLocal(): Promise<BuchungenDoc> {
        
        return db.get('buchungen').catch(err => {
            if (err.status == 404) return null;
            return Promise.reject(err);            
        });
    }
    
    public save(buchungen: Array<Buchung>): Promise<any> {
        
        
        return this.fetchLocal().then( (entity: BuchungenDoc) => {
            
            if (entity) {
                entity.buchungen = buchungen;
            }
            else {
                entity = {
                    _id: "buchungen",
                    _rev: null,
                    buchungen: buchungen 
                }
            }
            return db.put(entity);
        });

    }
    
}
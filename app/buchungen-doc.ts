import {Buchung} from './buchung';

export class BuchungenDoc {
    _id: string;
    _rev: string;

    buchungen: Array<Buchung>;    
}


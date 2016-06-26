
export interface Buchung {
    
    flugId: number;
    passagierId: number;
    buchungsStatus: number;
    flug: Flug; 
    
    isDirty: boolean;
    
}

export interface Flug {
    id: number;
    abflugort: string;
    zielort: string;
    datum: string;
}

import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'buchungsStatus',
    pure: true
})
export class BuchungsStatusPipe implements PipeTransform {
    
    transform(value: any, ...args: any[]): any {
        
        switch(value) {
            case 0: return "Booked (not checked in)";
            case 1: return "Checked in";
            case 2: return "Boarded";
        }
        
    }
}
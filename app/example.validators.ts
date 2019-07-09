import {FormControl, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidationErrors} from "@angular/forms/src/directives/validators";
import {InputOverviewExample, TheoError} from "./input-overview-example";
import {Observable} from "rxjs";
import { mapTo, delay } from 'rxjs/operators';

export function SimpleWeinMengeValidator(control: FormControl) : ValidationErrors | null 
{
       const menge = control.value;
       
       if ((menge == null) || menge === '') return null;


       if (Number(menge) <= 5) {
          return { 'wertZuKlein': true };
       }
       else if (Number(menge) >100 ) {
           return { 'wertZuGross': true }; 
       }
             
       return null;
}


export function ComplexerWeinMengeValidator(control: FormControl) : ValidationErrors | null 
{
       
       if (control.parent == null) return null; 
       
       const menge = control.value;
       const einheitID = control.parent.get("einheit2").value;
       
       if ((einheitID == null) || einheitID === '') return null;       
       if ((menge == null) || menge === '') return null;
       

       if (einheitID === 'id_liter') {
          if (Number(menge) <= 5) {
              return { 'wertLiterZuKlein': true };
          }
          else if (Number(menge) >100 ) {
              return { 'wertLiterZuGross': true }; 
          }

       }
       else if (einheitID === 'id_deziliter')
       {
          if (Number(menge) <= 5) {
              return { 'wertDeziZuKlein': true };
          }
          else if (Number(menge) >100 ) {
              return { 'wertDeziZuGross': true }; 
          }
       }

       return null;
}



export function MostComplexWeinMengeValidator(compoInputOverview: InputOverviewExample) : ValidatorFn
 { 
    
    return (control: FormControl) =>
    {
          
          if (!compoInputOverview.complexForm2  || !compoInputOverview.complexForm2.get('einheit2')) return null;
          
          
          const menge = control.value;
          const einheitID = compoInputOverview.complexForm2.get('einheit2').value;
          
          if ((einheitID == null) || einheitID === '') return null;       
          if ((menge == null) || menge === '') return null;
          

          if (einheitID === 'id_liter') {
              if (Number(menge) <= 5) {
                  return { 'wertLiterZuKlein': true };
              }
              else if (Number(menge) >100 ) {
                  return { 'wertLiterZuGross': true }; 
              }

          }
          else if (einheitID === 'id_deziliter')
          {
              if (Number(menge) <= 5) {
                  return { 'wertDeziZuKlein': true };
              }
              else if (Number(menge) >100 ) {
                  return { 'wertDeziZuGross': true }; 
              }
          }

          return null;
    }
}


export  function extrahiereErstenTheoFehler(formErrors: TheoError[], control: AbstractControl ) : string {

        let errorMessage : string = '';
        let  firstTheoError: TheoError;

        if (control.invalid) {
            firstTheoError = formErrors.find(

                (theoError:TheoError) => {return theoError.control == control && control.hasError(theoError.key);}
                )
        }

        if (firstTheoError) {
            errorMessage = firstTheoError.meldung;
        }

        return errorMessage;
    }




export function AsyncWeinUserValidator(control: FormControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const menge = control.value;        
    if ((menge == null) || menge === '') return Observable.of(null);
    

    let observableResult = (Number(menge) == 4 ? Observable.of({ 'wertGerade4': true } ) :  Observable.of(null));

    return observableResult.delay(1000);

} 

import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators, AbstractControl
} from '@angular/forms';
import {SimpleWeinMengeValidator, ComplexerWeinMengeValidator , MostComplexWeinMengeValidator, extrahiereErstenTheoFehler , AsyncWeinUserValidator} from "./example.validators";
import {ObservableWorkshopService} from "./observable.service";
import {Observable, Subject} from "rxjs";
import { mapTo, delay, tap, takeUntil } from 'rxjs/operators';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'input-overview-example',
  styleUrls: ['input-overview-example.css'],
  templateUrl: 'input-overview-example.html',

  providers: [ObservableWorkshopService]
})
export class InputOverviewExample implements OnInit {

  backgColrRed = {'background-color': 'red'};
  backgColrBlue = {'background-color': 'blue'};
  backgColrGreen = {'background-color': 'green'};
  backgColrHell = {'background-color': '#80ced6'};


  backgColr1 = this.backgColrHell;
  backgColr2 = this.backgColrHell;


  mengeWeinCtrl : FormControl = new FormControl({value: '', disabled: false}, [Validators.required,SimpleWeinMengeValidator]);
  einheitCtrl : FormControl = new FormControl({value: '', disabled: false}, Validators.required);

  einheitsoptionen: Einheitsoption[] = [{id: 'id_liter', bezeichnung: 'Liter'}, {id: 'id_deziliter', bezeichnung: 'DeziLiter'}];

  obsrv: Observable<number>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private observableService: ObservableWorkshopService){

  }



  ngOnInit(): void {


      let obs = this.observableService.ssimpleObservable();

      this.obsrv = obs.takeUntil(this.destroy$)
      .pipe(tap((numb) => this.backgColr1 = this.backgColrRed),
      delay(2000),
      tap((numb) => this.backgColr1 = this.backgColrGreen)
      );
      
      
      // this.backgColr1 = this.backgColrRed;


      this.mengeWeinCtrl2.markAsTouched();
      this.einheitCtrl2.markAsTouched();

      this.einheitCtrl2.valueChanges.subscribe(
        val => { // this.mengeWeinCtrl2.updateValueAndValidity();
         this.mengeWeinCtrl3.updateValueAndValidity();}
      );


      this.mengeWeinCtrl3.markAsTouched();
      
  }  

  public subscribeClick(event) : void {
      this.obsrv.subscribe((numb)=> {
          console.log("number: ", numb);
        },

        ()=> {console.log(" completed ")}

      )}

private destroyTake(event) {
  console.log("destry ta!")
   this.destroy$.next(false);
}


// 
  complexForm: FormGroup = new FormGroup({        
        'mengeWein' : this.mengeWeinCtrl,
        'einheit' : this.einheitCtrl
    })


// ===================================================================================================

  mengeWeinCtrl2 : FormControl = new FormControl({value: '', disabled: false}, [Validators.required,ComplexerWeinMengeValidator]);
  einheitCtrl2 : FormControl = new FormControl({value: '', disabled: false}, Validators.required);


  complexForm2: FormGroup = new FormGroup({        
        'mengeWein2' : this.mengeWeinCtrl2,
        'einheit2' : this.einheitCtrl2
    })

  
// ===================================================================================================


  mengeWeinCtrl3 : FormControl = new FormControl({value: '', disabled: false}, [Validators.required,MostComplexWeinMengeValidator(this)]);
  

  complexForm3: FormGroup = new FormGroup({        
        'mengeWein3' : this.mengeWeinCtrl3
    })

  // ==============================================================================================


  mengeWeinCtrl4 : FormControl = new FormControl({value: '', disabled: false}, [Validators.required],AsyncWeinUserValidator);
  
  complexForm4: FormGroup = new FormGroup({        
        'mengeWein4' : this.mengeWeinCtrl4
    })

  // ==============================================================================================





formErrors : TheoError[] = [
        {control: this.mengeWeinCtrl2, key : 'required',  meldung : 'Gen: Bitte \'ne schöne Menge Wein eingeben'} ,
        {control: this.mengeWeinCtrl2, key : 'wertLiterZuKlein',  meldung : 'Gen: Die angebenene Liter-Menge ist kleiner als 5'} ,
        {control: this.mengeWeinCtrl2, key : 'wertLiterZuGross', meldung : 'Gen: Die angebenene Liter-Menge ist grösser als 100'},
        {control: this.mengeWeinCtrl2, key : 'wertDeziZuKlein',  meldung : 'Gen: Die angebenene DEZILiter-Menge ist kleiner als 5'} ,
        {control: this.mengeWeinCtrl2, key : 'wertDeziZuGross',  meldung : 'Gen: Die angebenene DEZILiter-Menge ist grösser als 100'} ,

        {control: this.mengeWeinCtrl3, key : 'required',  meldung : 'Gen: Bitte eine schöne Menge Wein eingeben'} ,
        {control: this.mengeWeinCtrl3, key : 'wertLiterZuKlein',  meldung : 'Gen: Die angebenene Liter-Menge ist kleiner als 5'} ,
        {control: this.mengeWeinCtrl3, key : 'wertLiterZuGross', meldung : 'Gen: Die angebenene Liter-Menge ist grösser als 100'},
        {control: this.mengeWeinCtrl3, key : 'wertDeziZuKlein',  meldung : 'Gen: Die angebenene DEZILiter-Menge ist kleiner als 5'} ,
        {control: this.mengeWeinCtrl3, key : 'wertDeziZuGross',  meldung : 'Nen: Die angebenene DEZILiter-Menge ist grösser als 100'} ,

        {control: this.mengeWeinCtrl4, key : 'required',  meldung : 'Gen: Bitte \'ne asynchrone Menge Wein eingeben'} ,
        {control: this.mengeWeinCtrl4, key : 'wertGerade4',  meldung : 'Die asynchrone Menge ist gerade 4!'} ,
     ];


    getErrorFromControl(control: AbstractControl) : string {
        return extrahiereErstenTheoFehler(this.formErrors, control);
    }


}






export interface TheoError {
    control : AbstractControl;
    key: string;
    meldung: string;
}




export interface Einheitsoption {
    bezeichnung: string;
    id: string;
}





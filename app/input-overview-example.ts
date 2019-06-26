import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators, AbstractControl
} from '@angular/forms';
import {SimpleWeinMengeValidator, ComplexerWeinMengeValidator , MostComplexWeinMengeValidator, extrahiereErstenTheoFehler , AsyncWeinUserValidator} from "./example.validators";


/**
 * @title Basic Inputs
 */
@Component({
  selector: 'input-overview-example',
  styleUrls: ['input-overview-example.css'],
  templateUrl: 'input-overview-example.html',
})
export class InputOverviewExample implements OnInit {

  mengeWeinCtrl : FormControl = new FormControl({value: '', disabled: false}, [Validators.required,SimpleWeinMengeValidator]);
  einheitCtrl : FormControl = new FormControl({value: '', disabled: false}, Validators.required);

  einheitsoptionen: Einheitsoption[] = [{id: 'id_liter', bezeichnung: 'Liter'}, {id: 'id_deziliter', bezeichnung: 'DeziLiter'}];

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

  ngOnInit(): void {
      this.mengeWeinCtrl2.markAsTouched();
      this.einheitCtrl2.markAsTouched();

      this.einheitCtrl2.valueChanges.subscribe(
        val => { // this.mengeWeinCtrl2.updateValueAndValidity();
         this.mengeWeinCtrl3.updateValueAndValidity();}
      );


      this.mengeWeinCtrl3.markAsTouched();
      
  }  

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





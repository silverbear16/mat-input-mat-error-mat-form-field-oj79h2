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
  selector: 'observable-component',
  styleUrls: ['input-overview-example.css'],
  templateUrl: 'observable-component.html',

  providers: [ObservableWorkshopService]
})
export class ObservableComponent implements OnInit {

  backgColrRed = {'background-color': 'red'};
  backgColrBlue = {'background-color': 'blue'};
  backgColrGreen = {'background-color': 'green'};
  backgColrHell = {'background-color': '#80ced6'};


  backgColr1 = this.backgColrHell;
  backgColr2 = this.backgColrHell;
  backgColr3 = this.backgColrHell;


  einheitsoptionen: Einheitsoption[] = [{id: 'id_liter', bezeichnung: 'Liter'}, {id: 'id_deziliter', bezeichnung: 'DeziLiter'}];

  obsrv: Observable<number>;
  obsrv2: Observable<number>;
  obsrvHttp: Observable<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private observableService: ObservableWorkshopService){

  }



  ngOnInit(): void {


      let obs = this.observableService.ssimpleObservable();

      this.obsrv = obs.takeUntil(this.destroy$)      
      .pipe(
        delay(3000),
        tap((numb) => this.backgColr1 = this.backgColrRed),
      delay(1500),
      tap((numb) => this.backgColr1 = this.backgColrGreen)
      );
      

      let obs2 = this.observableService.eternalObservable();
      this.obsrv2 = obs2.takeUntil(this.destroy$)
          .pipe(tap((numb) => {
              console.log('tap vor delay : number: ', numb);
              this.backgColr2 = this.backgColrRed;}),
          delay(2000),
          tap((numb) => this.backgColr2 = this.backgColrGreen)
      );


      let obs3 = this.observableService.httpObservable();
      this.obsrvHttp = obs3.takeUntil(this.destroy$)
          .pipe(tap((resp) => {
              console.log('tap 1 http response: ', resp);
              this.backgColr3 = this.backgColrRed;}),
          delay(2000),
          tap((numb) => this.backgColr3 = this.backgColrGreen)
      );


      
  }  

  private subscribeClick(event) : void {
      this.obsrv.subscribe(
        (numb)=> {console.log("number: ", numb); },
        (err) => {console.log(" error: ", err); },
        ()=> {console.log(" completed ")}

      )}

  private destroyTake(event) {
    console.log("destry ta!")
    this.destroy$.next(true);
  }

  private subscribeClick2_1(event) : void {
      this.obsrv2.subscribe(
        (numb)=> {console.log("subscriber 1 next: ", numb); },
        (err) => {console.log(" error: ", err); },
        ()=> {console.log(" completed ")}
      )}
  
  private subscribeClick2_2(event) : void {
      this.obsrv2.subscribe(
        (numb)=> {console.log("subscriber 2 next: ", numb); },
        (err) => {console.log(" error: ", err); },
        ()=> {console.log(" completed ")}
      )}


  private destroyTake2(event) {
    console.log("destry ta!")
    this.destroy$.next(true);
  }

  private subscribeClick3(event) : void {
      this.obsrvHttp.subscribe(
        (numb)=> {console.log("number: ", numb); },
        (err) => {console.log(" error: ", err); },
        ()=> {console.log(" completed ")}

  )};

  private destroyTake3(event) {
    console.log("destry ta!")
    this.destroy$.next(true);
  }

  // ==============================================================================================


  mengeWeinCtrl4 : FormControl = new FormControl({value: '', disabled: false}, [Validators.required],AsyncWeinUserValidator);
  
  complexForm4: FormGroup = new FormGroup({        
        'mengeWein4' : this.mengeWeinCtrl4
    })

  // ==============================================================================================





formErrors : TheoError[] = [
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





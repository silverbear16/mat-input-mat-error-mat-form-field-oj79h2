import {FormControl, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidationErrors} from "@angular/forms/src/directives/validators";
import {InputOverviewExample, TheoError} from "./input-overview-example";
import {Observable} from "rxjs";
import { mapTo, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable(
)
export class ObservableWorkshopService {

  constructor() { }


  public ssimpleObservable() : Observable<number> {

    let obs = Observable.from([1,2,3,4]);
    
    return obs;

  }
}

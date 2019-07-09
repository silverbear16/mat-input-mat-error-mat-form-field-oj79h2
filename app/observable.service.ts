import {FormControl, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidationErrors} from "@angular/forms/src/directives/validators";
import {InputOverviewExample, TheoError} from "./input-overview-example";
import {Observable} from "rxjs";
import { mapTo, delay ,map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

@Injectable(
)
export class ObservableWorkshopService {

  constructor(private http: HttpClient) { }


  public ssimpleObservable() : Observable<number> {

    let obs = Observable.from([1,2,3,4]);
    
    return obs;

  }

  public eternalObservable() : Observable<number> {

    let obs = Observable.range(1,2000);
    
    return obs;

  }


  // 
  // 

  public httpObservable() : Observable<any> {    
    let obs  = this.http.get('https://api.myjson.com/bins/1gb9tf');
        
    return obs;

  }



}

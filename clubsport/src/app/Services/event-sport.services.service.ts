import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EventSport } from '../Shared/Models/EventSport';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthEventSport } from '../Shared/Interface/auth-event-sport';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthLoginService } from './auth-login.service';
@Injectable({
  providedIn: 'root'
})

export class EventSportServicesService extends BehaviorSubject<EventSport[]> {

  constructor(private http: HttpClient) {
    super(undefined);
  }
  private EventSport: EventSport[] = [];

  EventSportChanged = new Subject<EventSport[]>();

  AddEventSport(eventsport: EventSport): Observable<AuthEventSport[]> {

  eventsport.Id==null;
 // eventsport.R_AccessRef==null;
  //eventsport.EventId==null;
    return this.http.post<AuthEventSport[]>(environment.Addresshttp+'api/Event/AddEvent',eventsport,{})
    .pipe(map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
      
        this.EventSport.push(eventsport);
    this.EventSportChanged.next(this.EventSport.slice());
        catchError(this.handleError);
        return data;
    }));




    
}


  UpdateEventSport(index: string, newEventSport: EventSport): Observable<AuthEventSport[]> {
    this.EventSport[index] = newEventSport;
    this.EventSportChanged.next(this.EventSport.slice());


  
   // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthEventSport[]>(environment.Addresshttp + 'api/Event/updateEventsItem/' + index ,
    newEventSport
   // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );




    
  }
  DeleteEventSport(index: number): Observable<AuthEventSport[]> {
    //this.EventSport.splice(index, 1);
    this.EventSportChanged.next(this.EventSport.slice());
    //const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthEventSport[]>(environment.Addresshttp + 'api/Event/DeleteEventItem' + index ,
    { title: 'Angular POST Request Example' },

    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  // tslint:disable-next-line: typedef
  FindEventSport(index: number): Observable<AuthEventSport> {
     // tslint:disable-next-line: no-unused-expression
     this.EventSport[index];
  


     return this.http.post<AuthEventSport>(environment.Addresshttp + 'api/Event/FindEvent/' +index,
     { }
       ).pipe(
         tap(() => console.log('fetched!')),
         catchError(this.handleError)
       );
  }
  
  ReciveEventSport(): Observable<AuthEventSport[]> {
 

     const fields = this.http.post<AuthEventSport[]>(environment.Addresshttp + 'api/Event/GetEventsItems' ,
     { title: 'Angular POST Request Example' }

     ).pipe(
       tap(() => console.log('fetched!')),
       catchError(this.handleError)
     );
     
     return fields;

  }

  // tslint:disable-next-line: typedef
  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}

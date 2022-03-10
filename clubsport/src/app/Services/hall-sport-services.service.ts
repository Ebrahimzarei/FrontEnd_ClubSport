import { Injectable } from '@angular/core';
import { HallSport } from '../Shared/Models/HallSport';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthHallSport } from '../Shared/Interface/auth-hall-sport';

@Injectable({
  providedIn: 'root'
})
export class HallSportServicesService extends BehaviorSubject<HallSport[]> {
  private HallSport: HallSport[] = [];
  HallSportChanged = new Subject<HallSport[]>();

  constructor(private http: HttpClient) {
    super(undefined);
  }
  AddHallSport(hsport: HallSport) : Observable<HallSport[]> 
  {
  // //   this.HallSport.push(hsport);
  // //   this.HallSportChanged.next(this.HallSport.slice());
  // //   // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
  // //   return this.http.post<HallSport[]>(environment.Addresshttp + 'api/Halls/AddHall',
  // //    hsport ,
  // //   // {headers : header}
  // //   ).pipe(
  // //  tap(date => console.log('fetched!')),
  // // catchError(this.handleError)
  // //   );

  return this.http.post<HallSport[]>(environment.Addresshttp + 'api/Halls/AddHall',
  hsport).pipe(
    map(value => {
       
      this.HallSport.push(hsport);
      this.HallSportChanged.next(this.HallSport.slice());
      catchError(this.handleError);
      return value;
  }));

  }
  UpdateHallSport(index: number, hsport: HallSport) : Observable<AuthHallSport[]>{
    this.HallSport[index] = hsport;
    this.HallSportChanged.next(this.HallSport.slice());
    const body=JSON.stringify(hsport);
   // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthHallSport[]>(environment.Addresshttp + 'api/Halls/UpdateHallItem/' + index ,
    hsport
   // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  DeleteHallSport(index: number): Observable<AuthHallSport[]> {
   // this.HallSport.splice(index, 1);
    this.HallSportChanged.next(this.HallSport.slice());
  
    return this.http.post<AuthHallSport[]>(environment.Addresshttp + 'api/Halls/DeleteHallItem/' + index ,

    {index }
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  FindHallSport(index: number): Observable<AuthHallSport> {
  //  return this.HallSport[index];
  //const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
  return this.http.post<AuthHallSport>(environment.Addresshttp + 'api/Halls/FindHall/' +index,
{ }
  ).pipe(
    tap(() => console.log('fetched!')),
    catchError(this.handleError)
  );
  }
  ReciveHallSport() : Observable<AuthHallSport[]> {
    this.HallSport.slice();

    const fields = this.http.post<AuthHallSport[]>(environment.Addresshttp + 'api/Halls/GetHallItems' ,

    {}
    ).pipe(
      tap(() => console.log('fetched!')
      
      ),
      catchError(this.handleError)
    );
    return fields;
  }
  private handleError (error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}

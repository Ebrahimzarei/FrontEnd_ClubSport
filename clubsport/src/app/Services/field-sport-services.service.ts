import { Injectable } from '@angular/core';
import { FieldSport } from '../Shared/Models/FieldSport';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthFieldSport } from '../Shared/Interface/auth-field-sport';

@Injectable({
  providedIn: 'root'
})
export class FieldSportServicesService extends BehaviorSubject<FieldSport[]>  {
  private FieldSport: FieldSport[] = [];
  FieldSportChanged = new Subject<FieldSport[]>();

  constructor(private http: HttpClient) {
    super(undefined);
  }
  AddFieldSport(fsport: FieldSport) : Observable<AuthFieldSport[]>
  {

    return this.http.post<any[]>(environment.Addresshttp+'api/Fields/AddField',fsport)
    .pipe(map(field => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
      
        this.FieldSport.push(fsport);
    this.FieldSportChanged.next(this.FieldSport.slice());
        catchError(this.handleError);
        return field;
    }));

 
  //  const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthFieldSport[]>(environment.Addresshttp + 'api/AddField', fsport
  //  {headers : header}
    ).pipe(
   tap(date => console.log('fetched!')),
  catchError(this.handleError)
    );
  }
  UpdateFieldSport(index: number, fsport: FieldSport): Observable<AuthFieldSport[]> {
    this.FieldSport[index] = fsport;
    this.FieldSportChanged.next(this.FieldSport.slice());

    return this.http.post<AuthFieldSport[]>(environment.Addresshttp + 'api/Fields/updateFieldItem/' + index ,
    fsport,
    {}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  DeleteFieldSport(index: number): Observable<any[]> {
   // this.FieldSport.splice(index, 1);
    this.FieldSportChanged.next(this.FieldSport.slice());
 
    return this.http.post<AuthFieldSport[]>(environment.Addresshttp + 'api/Fields/DeleteFieldItem/' + index ,
    { index },
    {}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  FindFieldSport(index: number): Observable<AuthFieldSport> {
    // this.FieldSport[index];

     return this.http.post<AuthFieldSport>(environment.Addresshttp + 'api/Fields/FindField/' +index,
     {}
     ).pipe(
       tap(() => console.log('fetched!')),
       catchError(this.handleError)
     );
  }
  ReciveFieldSport(): Observable<AuthFieldSport[]> {
    // this.FieldSport.slice();
  //   const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
     const fields = this.http.post<AuthFieldSport[]>(environment.Addresshttp + 'api/Fields/GetFieldsItems' ,
     { title: 'Angular POST Request Example' }

     ).pipe(
       tap(() => console.log('fetched!')),
       catchError(this.handleError)
     );
     
     return fields;


  }
  private handleError (error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}

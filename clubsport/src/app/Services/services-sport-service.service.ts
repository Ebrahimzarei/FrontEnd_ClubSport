import { Injectable } from '@angular/core';
import { ServicesSport } from '../Shared/Models/ServicesSport';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthServicesSport } from '../Shared/Interface/auth-services-sport';

@Injectable({
  providedIn: 'root'
})
export class ServicesSportServiceService extends BehaviorSubject<ServicesSport[]> {
  private ServicesSport: ServicesSport[] = [];
  ServiceChange = new Subject<ServicesSport[]>();
  constructor(private http: HttpClient) {
    super(undefined);
  }
  AddServicesSport(Ssport: ServicesSport): Observable<ServicesSport[]> {

    return this.http.post<ServicesSport[]>(environment.Addresshttp+'api/Services/AddServices',Ssport,{})
    .pipe(map(data => {
  
      
        this.ServicesSport.push(Ssport);
    this.ServiceChange.next(this.ServicesSport.slice());
        catchError(this.handleError);
        return data;
    }));



   
  }
  UpdateServicesSport(index: number, Ssport: ServicesSport): Observable<AuthServicesSport[]> {
    this.ServicesSport[index] = Ssport;
    this.ServiceChange.next(this.ServicesSport.slice());
    // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthServicesSport[]>(environment.Addresshttp + 'api/UpdateServicesItem/' + index ,
    Ssport,
    // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  DeleteServicesSport(index: number): Observable<AuthServicesSport[]>{
    //this.ServicesSport.splice(index, 1);
    this.ServiceChange.next(this.ServicesSport.slice());
   // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthServicesSport[]>(environment.Addresshttp + 'api/DeleteServicesItem/' + index ,
    { title: '' },
   // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
  

      
    );
    
  }
  FindServicesSport(index: number): Observable<AuthServicesSport> {
 //   const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthServicesSport>(environment.Addresshttp + 'api/FindsServices/' ,index,
    {}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  ReciveServicesSport(): Observable<AuthServicesSport[]> {
      this.ServicesSport.slice();
     // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
      const fields = this.http.post<AuthServicesSport[]>(environment.Addresshttp + 'api/Services/GetServicesItems' ,
      { title: 'Angular POST Request Example' },
      {}
      ).pipe(
        tap(() => console.log('fetched!')),
        catchError(this.handleError)
      );
      return fields;
  }
  private handleError (error: HttpErrorResponse) {
    return throwError(error.message);
  }
}

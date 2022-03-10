import { Injectable } from '@angular/core';
import { ProgramSport, ProgramSportTwo } from '../Shared/Models/ProgramSport';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthProgramSport, AuthProgramSportInput } from '../Shared/Interface/auth-program-sport';
 

@Injectable({
  providedIn: 'root'
})
export class ProgramSportServicesService extends BehaviorSubject<ProgramSport[]> {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private PSport: ProgramSport[] = [];
  
  PSportChanged = new Subject<ProgramSport[]>();
  constructor(private http: HttpClient) {
    super(undefined);
  }
  AddProgramSport(PSport: ProgramSport): Observable<ProgramSport[]>
{ 
 let item:AuthProgramSportInput={
  AbsenceCost:+PSport.AbsenceCost,
   DaysOfYear:PSport.DaysOfYear,
   DetailsSport:PSport.DetailsSport,
   E_Sport:PSport.E_Sport,
   F_Sport:PSport.F_Sport,
   FieldSportRef:PSport.FieldSportRef,
   FromDate:PSport.FromDate,
   H_Sport:PSport.H_Sport,
   HallSportRef:PSport.HallSportRef,
   Id:null,
   M_Sport:PSport.M_Sport,
   NameProgram:PSport.NameProgram,
   PMemberSportRef:PSport.PMemberSportRef,
   ProgramSportId:PSport.ProgramSportId,
   ToDate:PSport.ToDate,

 };  
 
 
 

 let valuejson=JSON.stringify(PSport);
  return this.http.post<ProgramSport[]>(environment.Addresshttp+'api/ProgramSport/AddProgram',PSport,{})
  .pipe(map(data => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
    
      this.PSport.push(PSport);
  this.PSportChanged.next(this.PSport.slice());
      catchError(this.handleError);
      return data;
  }));  
}
UpdateProgramSport(index: number, PSport: ProgramSport): Observable<AuthProgramSport[]>{
  this.PSport[index] = PSport;

  this.PSportChanged.next(this.PSport.slice());
 
  
 // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
  return this.http.post<AuthProgramSport[]>(environment.Addresshttp + 'api/ProgramSport/UpdateProgram/' + index ,
  PSport,
 // {headers : header}
  ).pipe(
    tap(() => console.log('fetched!')),
    catchError(this.handleError)
  );
}
DeleteProgramSport(index: number): Observable<AuthProgramSport[]>{
  //this.PSport.splice(index, 1);
  this.PSportChanged.next(this.PSport.slice());
 // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
  return this.http.post<AuthProgramSport[]>(environment.Addresshttp + 'api/ProgramSport/DeleteProgramItem/' + index ,
  { title: '' },

  ).pipe(
    tap(() => console.log('fetched!')),
    catchError(this.handleError)
  );
}
FindProgramSport(index: number) : Observable<AuthProgramSport> {
 // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
  return this.http.post<AuthProgramSport>(environment.Addresshttp + 'api/ProgramSport/FindsPrograms/'+index ,
  {}
  ).pipe(
    tap(() => console.log('fetched!')),
    catchError(this.handleError)
  );

}
ReciveProgramSport(): Observable<AuthProgramSport[]>{
   this.PSport.slice();
   //const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
   const fields = this.http.post<AuthProgramSport[]>(environment.Addresshttp + 'api/ProgramSport/GetProgramItems' ,

   {}
   ).pipe(
   //  tap(() => console.log('fetched!')),
     catchError(this.handleError)
   );
   return fields;

}
private handleError (error: HttpErrorResponse) {
  return throwError(error.message);
}

}

import { Injectable } from '@angular/core';
import { FieldSport } from '../Shared/Models/FieldSport';
import { Subject } from 'rxjs/internal/Subject';
import { MemberSport, MemberSportOutPut } from '../Shared/Models/MemberSport';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthMemberSport } from '../Shared/Interface/auth-member-sport';

@Injectable({
  providedIn: 'root'
})
export class MemberSportServicesService extends BehaviorSubject<MemberSport[]> {
  private MemberSport: MemberSport[] = [];
  MemberSportChanged = new Subject<MemberSport[]>();
  constructor(private http: HttpClient) {
    super(undefined);
  }

  AddMemberSport(msport: any): Observable<MemberSport[]> {
  

    return this.http.post<MemberSport[]>(environment.Addresshttp + 'api/AddMemberSport',
    msport).pipe(
      map(user => {
         
        this.MemberSport.push(msport);
        this.MemberSportChanged.next(this.MemberSport.slice());
        catchError(this.handleError);
        return user;
    }));
 
   // );
  }
  UpdateMemberSport(index: number,msport: MemberSport)  : Observable<AuthMemberSport[]>  {
    this.MemberSport[index] = msport;
    this.MemberSportChanged.next(this.MemberSport.slice());
//    const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthMemberSport[]>(environment.Addresshttp + 'api/UpdateMemberSportItem/' + index ,
    msport,
    {}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  DeleteMemberSport(index: number) : Observable<MemberSportOutPut[]>  {
   // this.MemberSport.splice(index, 1);
    this.MemberSportChanged.next(this.MemberSport.slice());
    //const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<MemberSportOutPut[]>(environment.Addresshttp + 'api/DeleteMemberSportItem/' + index ,

    {},
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  FindMemberSport(index: number) : Observable<MemberSportOutPut> {
  
    return this.http.post<MemberSportOutPut >(environment.Addresshttp + 'api/FindMembersSport/'+index ,
    {}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  ReciveMemberSport() : Observable<MemberSportOutPut[]> {
     // this.MemberSport.slice();
    //  const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
      const fields = this.http.post<MemberSportOutPut[]>(environment.Addresshttp + 'api/GetMembersSportItems' ,
      { },
      {}
      ).pipe( 
        tap(() => console.log('fetched!')),
        catchError(this.handleError)
      );
      return fields;


  }
  private handleError (error: HttpErrorResponse) {
    console.log(error.message);
    console.log(error.error);
    return throwError(error.message);
  }
}

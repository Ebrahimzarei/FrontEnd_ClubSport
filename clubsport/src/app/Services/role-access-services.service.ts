import { Injectable } from '@angular/core';
import { RoleAccess } from '../Shared/Models/RoleAccess';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AuthRoleAccess } from '../Shared/Interface/auth-role-access';

@Injectable({
  providedIn: 'root'
})
export class RoleAccessServicesService extends BehaviorSubject<AuthRoleAccess[]>  {
  private RoleAccess: RoleAccess[] = [];
  RoleChanged = new Subject<RoleAccess[]>();
  constructor(private http: HttpClient) {
    super(undefined);
  }
  // tslint:disable-next-line: no-shadowed-variable
  AddRoleAccess( RoleAccess: RoleAccess) : Observable<AuthRoleAccess[]>
  {
    this.RoleAccess.push(RoleAccess);
    this.RoleChanged.next(this.RoleAccess.slice());
    //const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthRoleAccess[]>(environment.Addresshttp + 'api/AddRole',
    { RoleAccess }
   // {headers : header}
    ).pipe(
   tap(product => console.log('fetched!')),
  catchError(this.handleError)
    );
  }
  // tslint:disable-next-line: no-shadowed-variable
  UpdateRoleAccess(index: number, RoleAccess: RoleAccess): Observable<AuthRoleAccess[]> {
    this.RoleAccess[index] = RoleAccess;
    this.RoleChanged.next(this.RoleAccess.slice());
   // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthRoleAccess[]>(environment.Addresshttp + 'api/UpdateRoleItem/' + index ,
    RoleAccess
   // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  DeleteRoleAccess(index: number): Observable<AuthRoleAccess[]>{
  //  this.RoleAccess.splice(index, 1);
    this.RoleChanged.next(this.RoleAccess.slice());
    const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthRoleAccess[]>(environment.Addresshttp + 'api/DeleteRoleItem/' + index ,
    { },
  //  {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  FindRoleAccess(index: number) : Observable<AuthRoleAccess> {
  //  const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthRoleAccess>(environment.Addresshttp + 'api/FindsRoles/' ,index,
    { }
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  ReciveRoleAccess(): Observable<AuthRoleAccess[]> {
      this.RoleAccess.slice();
      // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
      const fields = this.http.post<AuthRoleAccess[]>(environment.Addresshttp + '/api/GetRolesItems' ,

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

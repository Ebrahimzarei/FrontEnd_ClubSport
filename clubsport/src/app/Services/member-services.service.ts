import { Injectable } from '@angular/core';
import { Member } from '../Shared/Models/Member';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { AuthMember } from '../Shared/Interface/auth-member';

@Injectable({
  providedIn: 'root'
})
export class MemberServicesService extends BehaviorSubject<Member[]> {
  private Member: Member[] = [];
  
  MemberChanged = new Subject<Member[]>();
  AuthMemberChnaged=new Subject<AuthMember[]>();
  constructor(private http: HttpClient) {
    super(undefined);
  }

  AddMember(Items: Member) : Observable<AuthMember[]>
   {

  //   const json=JSON.stringify(Items);
  //   const body = new HttpParams()
  // .set('item', json);
  //   const headers = { 'content-type': 'application/json'}  ;

    return this.http.post<AuthMember[]>(environment.Addresshttp+'api/Members/AddMember/',Items)
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
      
        this.Member.push(Items);
        this.MemberChanged.next(this.Member.slice());
        catchError(this.handleError);
      
        return user;
    }));

  }
  UpdateMember(index: number ,member: Member)  : Observable<AuthMember[]> {
    this.Member[index] = member;
    this.MemberChanged.next(this.Member.slice());
 
   // const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    return this.http.post<AuthMember[]>(environment.Addresshttp + 'api/Members/UpdateMemberItem/' + index ,
    member,
   // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  DeleteMember(index: number) : Observable<AuthMember[]>{
    //this.Member.splice(index, 1);
    this.MemberChanged.next(this.Member.slice());
  
    return this.http.post<AuthMember[]>(environment.Addresshttp + 'api/Members/DeleteMemberItem/'+index ,
    {  },
   // {headers : header}
    ).pipe(
      tap(() => console.log('fetched!')),
      catchError(this.handleError)
    );
  }
  FindMember(index: number) : Observable<AuthMember> {
   // return this.Member[index];
//   const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
   let value= this.http.post<AuthMember>(environment.Addresshttp + 'api/Members/FindsMembers/' +index
,{},
  ).pipe(
    tap(() => console.log('fetched!')),
    catchError(this.handleError)
  );
  return value;
  }
  ReciveMember() : Observable<AuthMember[] > {
  //  this.Member.slice();
  //  const header = new HttpHeaders({Authorization: 'Bearer ' + 'tokenn'});
    const fields = this.http.post<AuthMember[]>(environment.Addresshttp + 'api/Members/GetAllMember' ,
    { },

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

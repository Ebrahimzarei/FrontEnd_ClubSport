import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {Member} from '../Shared/Models/Member';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
export class UserLogin{
  public Username: string;
  public Password: string;
  constructor(Username: string , Password: string ){
    this.Username = Username;
    this.Password = Password ;

    
    }
 
}
export class UserAccess{


  public Username: string;
  public Password: string;
  public Role:string;
  public Token: string;
  public Photo:string;

constructor(Username: string , Password: string , Token: string,Role:string,photo:string){
this.Username = Username;
this.Password = Password ;
this.Token = Token ; 
this.Role=Role;
this.Photo=photo;

}



    }
    
export interface IUserAccess {
       UserName: string;
       Password: string;
       Token: string;
       Role:String;
 
    }
@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private Member: Member;
  public islogin: boolean;
  user = new BehaviorSubject <UserAccess>(null);
  
  constructor(private http: HttpClient, private router: Router) { 

    this.user = new BehaviorSubject<UserAccess>(JSON.parse(localStorage.getItem('user')));
   // this.user = this.user.asObservable();
  }
  public get userValue(): UserAccess {
 
    return this.user.value;
}
  LoginStepTwo(userlogin:UserLogin):Observable<UserAccess>
  {

   // const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(userlogin);
    return this.http.post<UserAccess>(environment.Addresshttp+'api/Members/login',body)
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
        return user;
    }));
 //environment.Addresshttp+'api/Members/login?UserName=Ebrahim&Password=2280854236' 
 //environment.Addresshttp+'api/Members/login'
//  return this.http.post<UserAccess>(environment.Addresshttp+'api/Members/login' , 
//  body).pipe(map(user=>
//   {
//     localStorage.setItem('user',JSON.stringify())
//   }
//   ));

  }

   Login ( UserName: string , Password: string){
    let params = new HttpParams();
    params = params.append("UserName", UserName);
    params = params.append("Password", Password);
    return this.http
    .post<any>(
 environment.Addresshttp+'api/Members/login' ,
     {params}
    ).pipe(catchError(this.handelError), tap(resData => {
      this.handleAuthentication(
        resData.username,
        resData.password,
        resData.token,
       
      );
    }));

  }
  // tslint:disable-next-line: typedef
  Logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  // tslint:disable-next-line: typedef
  private handleAuthentication(
    password: string,
    username: string,
    token: string,
 

  )
   {
 
   // localStorage.setItem('userData', JSON.stringify(users.Token));
    //localStorage.setItem('userData', Token);
  }
  // tslint:disable-next-line: typedef
  private handelError (errorRes: HttpErrorResponse) {

    return throwError(errorRes.message);
     

 
  }
}

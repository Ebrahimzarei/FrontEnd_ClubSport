import { Injectable } from '@angular/core';
import {AuthLoginService} from 'src/app/Services/auth-login.service';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse, HttpParams, HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor  {
  
  constructor(private authenticationService: AuthLoginService){}
  intercept(httpReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.Token;
    const isApiUrl = httpReq.url.startsWith(environment.Addresshttp);
  
  

 // const token = window.localStorage.getItem('UserData');
  //  if (user.token) {
      if (isLoggedIn && isApiUrl) {
        httpReq = httpReq.clone({
          setHeaders: {
              Authorization: `Bearer ${user.Token}`
          }
      });
    //  httpReq = httpReq.clone({ headers: httpReq.headers.set('Authorization', 'Bearer' + user.token) });
    //  }  
     
               }
    if (!httpReq.headers.has('Content-Type')) {
    httpReq = httpReq.clone({ headers: httpReq.headers.set('Content-Type', 'application/json') });
  
    // application/x-www-form-urlencoded;charset=UTF-8
                              }
httpReq = httpReq.clone({ headers: httpReq.headers.set('Accept', 'application/json') });
return next.handle(httpReq).pipe(
  map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
      }
      return event;
  }));

 

  }
}

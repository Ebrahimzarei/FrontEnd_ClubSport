import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import { AuthLoginService, IUserAccess, UserLogin } from '../Services/auth-login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export interface IUserLoginAccess {
  UserName: string;
  Password: string;
  Token: string;

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 // styleUrls: ['./login.component.css','./app.min.css','./components.css','./custom.css','./style.css']
 styleUrls: ['./login.component.css'

  ],
  // tslint:disable-next-line: deprecation
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

 

  constructor(private http: HttpClient,private router: Router, private LoginServices: AuthLoginService,   private route: ActivatedRoute) {

  }
public IsError:string;
public ModelUser:IUserAccess;
public  InputUser:UserLogin;
  ngOnInit(): void {
  }
 
  onSubmit(form) {

    if (!form.value) {

      return;

    }

 

  
    const username = form.value.username;
    const password = form.value.password;
    this.InputUser=new UserLogin(username,password);
 
     
 this.LoginServices.LoginStepTwo(this.InputUser).subscribe(
   dates=>
   {
     if (dates) 
     {
  // alert(dates.Username);
   localStorage.setItem('currentusername', JSON.stringify(dates.Username));
   localStorage.setItem('currentrole', JSON.stringify(dates.Role));
   localStorage.setItem('currentphoto', dates.Photo);
 console.log("dates",dates);
   // this.router.navigate(['/header'], { relativeTo: this.route });
    this.router.navigate(['/header/MemberRegister'], { relativeTo: this.route });


   // window.localStorage.setItem("UserData",dates.token);
     } 
     else {
    alert("چنین کاربری در سیستم ثبت نشده است");
   
   }
  }
 )
    // this.LoginServices.LoginStepTwo(username,password ).subscribe(
   
    // //  error =>  console.log(error),
    // //   error=> alert(error),
    //         date=>{
    //           if (date) {   
            
    //             alert(date.UserName.toString());
              
    //           } else {
    //             alert("چنین کاربری در سیستم ثبت نشده است");
    //             this.router.navigate(['/header'], { relativeTo: this.route });

    //           }
    //         },
    //         // x=>this.ModelUser.UserName==x.UserName,
    //      //   x=>this.ModelUser.Token==x.Token,
  
      
    //   );
  



 

  


  }

}
export class UserLoginAccess{


  public UserName: string;
  public Password: string;
  public Token: string;

constructor(username: string , password: string , token: string){
this.UserName = username;
this.Password = password ;
this.Token = token ;

}}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthMember } from 'src/app/Shared/Interface/auth-member';
@Injectable({
  providedIn: 'root'
})
export class ReportServices {
  private usernameSource = new BehaviorSubject<string>('Onejohi Tony');
  // private MemberRegisterSource = new BehaviorSubject<AuthMember[]>();

  username = this.usernameSource.asObservable();
  changeUsername(username: string) {
    this.usernameSource.next(username);
  }
  constructor() { }
}

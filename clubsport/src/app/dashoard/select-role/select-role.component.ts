import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {RoleAccessServicesService} from '../../Services/role-access-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
import { AuthMemberSport } from 'src/app/Shared/Interface/auth-member-sport';
import { AuthMember } from 'src/app/Shared/Interface/auth-member';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { MemberServicesService } from 'src/app/Services/member-services.service';
@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit {
  public options: string[] = [ 'َAdmin', 'User'];
  ReciveSelectRole: FormGroup ;
  private EventSportList:AuthEventSport[]=[];
  private MemberList:AuthMember[]=[];
    E_Sport:AuthEventSport[]=[];
      M_Sport:AuthMember[]=[];

  constructor(private frmbuilder: FormBuilder,
              private dialog: MatDialog,
              private EventServices:EventSportServicesService,
              private MemberSerives:MemberServicesService,
              private roleservices: RoleAccessServicesService) {}
  InitForm(){
    this.EventServices.ReciveEventSport().subscribe(x=>this.EventSportList=x);
    this.MemberSerives.ReciveMember().subscribe(x=>this.MemberList=x);

    this.ReciveSelectRole = this. frmbuilder.group ({
      MemberRegister:
       new FormControl(null, [Validators.required]),
      E_Sport: new FormControl(null, [Validators.required]),
      M_Sport: new FormControl(null, [Validators.required]),



      TypeMemberRegister: new FormControl(null,[Validators.required])

    });
  }
  // tslint:disable-next-line: typedef
  PostDataSelectRole(ReciveSelectRole){

    if (this.ReciveSelectRole.invalid) {
      return;
  }
    this.roleservices.AddRoleAccess(ReciveSelectRole.value);
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ثبت نقش کاربر',
        message: 'ثبت نقش کاربر  با موفقیت انجام شد'
      }
    });
  }
  ngOnInit(): void {
    this.InitForm();
  }

}

import { Component, OnInit } from '@angular/core';
import { RoleAccess } from 'src/app/Shared/Models/RoleAccess';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleAccessServicesService } from 'src/app/Services/role-access-services.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthRoleAccess } from 'src/app/Shared/Interface/auth-role-access';

@Component({
  selector: 'app-edit-selectrole',
  templateUrl:  './edit-selectrole.component.html',
  styleUrls: ['./edit-selectrole.component.css']
})
export class EditSelectroleComponent implements OnInit {

  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  public  ErrorMessage: string;
  private RoleAccess: RoleAccess  ;
  private AuthRole:AuthRoleAccess;
  ReciveRoleAccess: FormGroup ;

  imageSrc: string;
  constructor(private frmbuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditSelectroleComponent>,
              private dialog: MatDialog,
              private ServiceRole: RoleAccessServicesService) { }
  ngOnInit(): void {
    const IdMemberSport = +window.localStorage.getItem('IdSelectRoleEdit');
    this.ServiceRole.FindRoleAccess(IdMemberSport).subscribe(
      result => this.AuthRole  = result,


       error =>  console.log(error),




       );
  }
  IniitForm(){
    this.ReciveRoleAccess = this.frmbuilder.group ({
      NameField: new FormControl(this.AuthRole.NameRole, [Validators.required, Validators.minLength(4)]),
    ///  MemberRegister: new FormControl(this.RoleAccess.M_Sport.filter(x=>x.Ncode), [Validators.required]),
      TypeMemberRegister: new FormControl(this.AuthRole.Role,[Validators.required])
      });

  }
  get f() {

    return this.ReciveRoleAccess.controls;

  }
  PostDataRoleAccess(ReciveProgramSport){
    const IdSelectRole = +window.localStorage.getItem('IdSelectRoleEdit');
this.ServiceRole.UpdateRoleAccess(this.AuthRole.Id,ReciveProgramSport).subscribe(error=>console.log(error));
    console.log('test');
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش رویداد',
        message:'رویداد شما با موفقیت ویرایش شد'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });

  }


}

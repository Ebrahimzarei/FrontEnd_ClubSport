import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberServicesService } from 'src/app/Services/member-services.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthRoleAccess } from 'src/app/Shared/Interface/auth-role-access';
import { RoleAccessServicesService } from 'src/app/Services/role-access-services.service';
import { AuthMember } from 'src/app/Shared/Interface/auth-member';
import { RoleAccess } from 'src/app/Shared/Models/RoleAccess';
import { Roles } from 'src/app/Shared/Enum/Roles';
import { MemberSport } from 'src/app/Shared/Models/MemberSport';
import { Member } from 'src/app/Shared/Models/Member';
@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrls: ['./member-register.component.css']
})
export class MemberRegisterComponent implements OnInit {
  MemberRegister: FormGroup ;
  private RoleAccessList:AuthRoleAccess[]=[];
   imageSrc: string;
   OnlyNumberPattern = "/^-?(0|[1-9]\d*)?$/)";
   isValidFormSubmitted = null;
   

   constructor(private frmbuilder: FormBuilder,
               private dialog: MatDialog,
               private RoleAccessService:RoleAccessServicesService,
               private memberService: MemberServicesService) {}
   InitForm(){
     
     this.RoleAccessService.ReciveRoleAccess().subscribe(x=>this.RoleAccessList=x);

    this.MemberRegister = this.frmbuilder.group ({
      FullName: new FormControl(null, [ Validators.required, Validators.minLength(5)]),
      // tslint:disable-next-line: max-line-length   
      Role: new FormControl(null, [Validators.required]),
      UserName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      Password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      Natinalcode: new FormControl(null, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]),
      FatherName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      Photo: new FormControl(),
      fileSource: new FormControl('', [Validators.required])
      });
  }
  get f(){
    return this.MemberRegister.controls;
  }
  get CodeMelli() {
    return this.MemberRegister.get('MemberRegCodeMelli');
 }
  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
       // alert(reader.result.toString());
      //  this.getBase64(event);


        this.MemberRegister.patchValue({
          fileSource: reader.result,
    //  Photo:reader.result,
      // MemberRegPhoto : reader.result as string
        });
      };
    }
  }
  ngOnInit(): void {
    this.InitForm();
  }
     // tslint:disable-next-line: typedef
     PostDataMemberRegister(MemberRegister){
    // window.alert(MemberRegister.form.value.MemberRegPhoto);
   // console.log(MemberRegister.value.fileSource);

    this.isValidFormSubmitted=false;

    if (this.MemberRegister.invalid) {
      return;
  }
  this.isValidFormSubmitted=true;
  MemberRegister.value.Photo=MemberRegister.value.fileSource;

//let Member:Member;
//let Member2:Member;
// let Member: Member = {
//  FatherName:"",
//  InsertDateTime:null,
//  id:null,
//  FullName:"",
//  Id:null,
//  R_Access:null,
//  Role:"",
//  Token:null,
//  Natinalcode:null,
//  Password:"",
//  Photo:"",
//  UserName:""

 

// };

//  Member.FullName=this.MemberRegister.value.MemberRegFullName ;
// Member.FatherName=this. MemberRegister.value.MemberRegNameFather;
 
// Member.Natinalcode +=this.MemberRegister.value.MemberRegCodeMelli;
// Member.Password=this.MemberRegister.value.MemberRegPassword;
// Member.Photo=this.MemberRegister.value.fileSource;
 
// Member.Role=this.MemberRegister.value.RoleAccess;
// Member.UserName=this.MemberRegister.value.MemberRegUserName;
    this.memberService.AddMember(MemberRegister.value).subscribe(error=>console.log(error));
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ثبت کاربر',
        message: 'ثبت کاربر شما با موفقیت انجام شد'
      }
    });
  }

}

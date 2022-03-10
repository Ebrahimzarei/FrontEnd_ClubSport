import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MemberSportServicesService } from '../../Services/member-sport-services.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { RoleAccessServicesService } from 'src/app/Services/role-access-services.service';
import { AuthRoleAccess } from 'src/app/Shared/Interface/auth-role-access';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { MemberSport } from 'src/app/Shared/Models/MemberSport';

@Component({
  selector: 'app-member-sport',
  templateUrl: './member-sport.component.html',
  styleUrls: ['./member-sport.component.css']
})
export class MemberSportComponent implements OnInit {
  MemberSport: FormGroup ;
  private RoleAccessList:AuthRoleAccess[]=[];
  private ProgramList:AuthProgramSport[]=[];
  private HallList:AuthHallSport[]=[];


  R_Sport:AuthRoleAccess[];
  P_Sport:AuthProgramSport[];
  H_Sport:AuthHallSport[];
 
  imageSrc: string;
  constructor(private frmbuilder: FormBuilder,
              private dialog: MatDialog ,
              private RoleServices:RoleAccessServicesService,
              private ProgramServices:ProgramSportServicesService,
              private HallServices:HallSportServicesService,
              private memberService: MemberSportServicesService) {
  }
  InitForm(){
this.RoleServices.ReciveRoleAccess().subscribe(x=>this.RoleAccessList=x);
this.ProgramServices.ReciveProgramSport().subscribe(x=>this.ProgramList=x);
this.HallServices.ReciveHallSport().subscribe(x=>this.HallList=x);


    this.MemberSport = this.frmbuilder.group ({
      FullName: new FormControl(null, [Validators.required,Validators.minLength(5)]),
  



      // tslint:disable-next-line: max-line-length
      Ncode: new FormControl(null, [Validators.required, Validators.minLength(10) ]),
      Photo: new FormControl(),
      fileSource: new FormControl('', [Validators.required])

      });
  }
  PostDataMemberSport(MemberSport)
  {
    if (this.MemberSport.invalid) {
      return;
  }
 
  let user:MemberSport={id:null,
    fullName:MemberSport.value.FullName,
  
 
 
     ncode:parseInt(MemberSport.value.Ncode),
  
     photo:MemberSport.value.fileSource,
 
  };
  let val={
    FullName:MemberSport.value.FullName,
  
 
 
    Ncode:parseInt(MemberSport.value.Ncode),
 
    Photo:MemberSport.value.fileSource,
  }
  MemberSport.value.Photo=MemberSport.value.fileSource;

  user.fullName=MemberSport.value.FullName;
  user.ncode=parseInt(MemberSport.value.Ncode);
  user.photo=MemberSport.value.fileSource;
 
//
 
    this.memberService.AddMemberSport(val).subscribe(x=>console.log(x));
    this.MemberSport.reset();
    this.imageSrc=null;
   
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ثبت ورزشکار',
        message: 'ثبت ورزشکار شما با موفقیت انجام شد'
      }
      
    });
  

  }
  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
     //   this.MemberSport.value.Photo=reader.result as String;
       // alert(reader.result.toString());
      //  this.getBase64(event);


        this.MemberSport.patchValue({
          fileSource: reader.result,
         // Photo:reader.result as string
      // MemberRegPhoto : reader.result as string
        });
      };
    }
  }
  get f(){
    return this.MemberSport.controls;
  }
  ngOnInit(): void {
    this.InitForm();
  }

}

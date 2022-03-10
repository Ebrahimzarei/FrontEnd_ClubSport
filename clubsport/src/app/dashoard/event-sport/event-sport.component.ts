import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { EventSportServicesService } from '../../Services/event-sport.services.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';
import { MemberSport } from 'src/app/Shared/Models/MemberSport';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { AuthRoleAccess } from 'src/app/Shared/Interface/auth-role-access';
import { RoleAccessServicesService } from 'src/app/Services/role-access-services.service';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { IDropdownSettings  } from 'ng-multiselect-dropdown';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { EventSport } from 'src/app/Shared/Models/EventSport';
import { ProgramSport } from 'src/app/Shared/Models/ProgramSport';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';


@Component({
  selector: 'app-event-sport',
  templateUrl: './event-sport.component.html',
  styleUrls: ['./event-sport.component.css']
})
export class EventSportComponent implements OnInit {

  constructor(private frmbuilder: FormBuilder
    , private EventServices: EventSportServicesService
   
    ,private RoleServices:RoleAccessServicesService
    ,private ProgramServices:ProgramSportServicesService
    ,private FieldServices:FieldSportServicesService
    , private HallService:HallSportServicesService
    , private dialog: MatDialog
    ) {

  }
  dateObject: any;
  ReciveEventSport: FormGroup ;
  submitted = false;
 
  public ProgramList: AuthProgramSport[]=[];
  ProgramSport: AuthProgramSport;
  F_Sport:AuthFieldSport[]=[];
  FieldSportList:FieldSport[]=[];
  FieldSport: FieldSport;
  EventSportList:EventSport[]=[];
  AuthEventSportList:AuthEventSport[]=[];


  H_Sport: AuthHallSport[]=[];
  HallSport: AuthHallSport;
  HallSportList: AuthHallSport[]=[];

  R_Access:AuthRoleAccess[];
  
  

  public options: string[] = ['Test1', 'Test', 'est'];
   // tslint:disable-next-line: typedef
   InitForm(){
    this.ProgramServices.ReciveProgramSport().subscribe((data:any[])=>{
      console.log(data);
     // this.ProgramSport=data;
      this.ProgramList=data;
      console.log("EbrahimProgramSport",this.ProgramList);
      //console.log("EBRAHIM2",this.M_Sport);
    });

 
    this.FieldServices.ReciveFieldSport().subscribe((data:any[])=>{
      console.log(data);
      
      this.FieldSportList=data;
      this.F_Sport=data;
      console.log("EbrahimFieldSportList",this.FieldSportList);
      //console.log("EBRAHIM2",this.M_Sport);
    });
    this.HallService.ReciveHallSport().subscribe((data:any[])=>{
      console.log(data);
      
      this.HallSportList=data;
      this.H_Sport=data;
      console.log("EbrahimHallSport",this.HallSportList);
      //console.log("EBRAHIM2",this.M_Sport);
    });

  
    this.ReciveEventSport = this.frmbuilder.group ({
      NameEvent: new FormControl(null, Validators.required),
     // NameEventResult: new FormControl(null, Validators.required),
      // ProgramSport: new FormControl(null, Validators.required),
      // FieldSport: new FormControl(null, Validators.required),
      // HallSport: new FormControl(null, Validators.required),
      HallSportArray:new FormControl(null),
      ProgramSportArray:new FormControl(null),
      FieldSportArray:new FormControl(null),

      FromDate: new FormControl(null, Validators.required),
      ToDate: new FormControl(null, Validators.required),
      NameCoach: new FormControl(null, [Validators.required, Validators.minLength(15)])
      });
   
 


  }

  ngOnInit(): void {
    this.InitForm();
    
  }

   get f() {

  return this.ReciveEventSport.controls;

}
 PostData(ReciveEventSport)
{

  if (this.ReciveEventSport.invalid) {
// alert(this.ReciveEventSport.err);
   return;
}
  this.submitted = true;
  this.HallSport= this.HallSportList.find(date=>date.Id===+this.ReciveEventSport.value.HallSportArray);
  this.FieldSport=this.FieldSportList.find(date=>date.Id===+this.ReciveEventSport.value.FieldSportArray);
 this.ProgramSport=this.ProgramList.find(date=>date.Id===+this.ReciveEventSport.value.ProgramSportArray);
  //HallSportArray
//ProgramSportArray
//FieldSportArray
let Value:EventSport={
FromDate:this.ReciveEventSport.value.FromDate,
ToDate:this.ReciveEventSport.value.ToDate,
RefeRee:this.ReciveEventSport.value.NameCoach,
NameEvent:this.ReciveEventSport.value.NameEvent,
P_Sport:null,
HallSport:null,
EventResult:null,
Id:123,
F_Sport:null,
FieldSportRef:this.FieldSport.Id,
HallSportRef:this.HallSport.Id,
ProgramSportRef:this.ProgramSport.Id,
R_AccessRef:0,
RoleAccess:null




};
Value.Id==null;
Value.R_AccessRef==null;

 
    this.EventServices.AddEventSport(Value).subscribe((date:any[])=>
    {
   // this.ProgramList=date;
    this.EventSportList=date;
this.AuthEventSportList=date;
 //   console.log("EBRAHIMVALUE",date);
     }
    );

    let confirmDialog;
  
    if (this.EventSportList!==null) {
     confirmDialog  = this.dialog.open(ConfirmationDialogComponent, {
       data: {
        title: 'ثبت رویداد',
        message: 'ثبت رویداد شما با موفقیت انجام شد'
       }

     }
     ) ;

     this.ReciveEventSport.clearValidators();
     this.ReciveEventSport.reset();
    } 
    
    else {
      confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
       data: {
         title:  'ثبت خطا',
         message:'وجود حطا درثبت رویداد'
       }
     });
    }

 // console.log(ReciveEventSport.value.NameEvent);

 

}

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {ProgramSportServicesService} from '../../Services/program-sport-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthMemberSport, AuthMemberSportOutPut } from 'src/app/Shared/Interface/auth-member-sport';
import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { MemberSport, MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { ProgramSport } from 'src/app/Shared/Models/ProgramSport';
import { Member } from 'src/app/Shared/Models/Member';

 
import { NullTemplateVisitor } from '@angular/compiler';
import { Days } from 'src/app/Shared/Models/Days';
@Component({
  selector: 'app-program-sport',
  templateUrl: './program-sport.component.html',
  styleUrls: ['./program-sport.component.css']
})

export class ProgramSportComponent implements OnInit {
 
  items = [
    {id: 1, name: 'شنبه'},
    {id: 2, name: 'یک شنبه'},
    {id: 3, name: 'دوشنبه'},
    {id: 4, name: 'سه شنبه'},
    {id: 5, name: 'چهار شنبه'},
    {id: 6, name: 'پنج شنبه'},
    {id: 7, name: 'جمعه'},
   
  ];
  selected = [
    {id: 1,name:"شنبه"},
    {id: 2,name:"یک شنبه"}
  ];
  // itemstwo=[
  //   {id,name}
  // ];
  ReciveProgramSport: FormGroup ;

  private MemberSporList:MemberSport[]=[];
  private FieldSportList:AuthFieldSport[]=[];

  private EventSportList:AuthEventSport[]=[];
 


   E_Sport:AuthEventSport[]=[];
   H_Sport:HallSport[];
   fullname:string;
   ListHallSport:HallSport[];
   HallSport:HallSport;
   F_Sport:FieldSport[]=[];
   FieldSport:FieldSport;
   ListFieldSport:FieldSport[]=[];
   M_Sport:AuthMemberSportOutPut[]=[];
   ListMemberSport:AuthMemberSport[]=[];

   MemberSport:AuthMemberSportOutPut;
  ItemDay:number;
 ValueDays:Days;

 ListProgramSport:ProgramSport[]=[];





  constructor(private frmbuilder: FormBuilder,
              private dialog: MatDialog,
              private FieldServices:FieldSportServicesService,
              private MemberSportServices:MemberSportServicesService,
              private HallServices:HallSportServicesService,
              private EventServices:EventSportServicesService,
              private programservices: ProgramSportServicesService) {}
  InitForm(){
    this.H_Sport=[];
    this.ListHallSport=[];
    this.F_Sport=[];
    this.ListFieldSport=[];
 

 
  
       
    this.HallServices.ReciveHallSport().subscribe((data:any[])=>{
      console.log(data);
      this.H_Sport=data;
      this.ListHallSport=data;
      console.log("EbrahimHSport",this.ListHallSport);
      //console.log("EBRAHIM2",this.M_Sport);
    });
    this.FieldServices.ReciveFieldSport().subscribe((data:any[])=>{
     // console.log(data);
      this.F_Sport=data;
      this.ListFieldSport=data;
      console.log("EbrahimFIELDSport",this.ListFieldSport);
      //console.log("EBRAHIM2",this.M_Sport);
    });

    this.MemberSportServices.ReciveMemberSport().subscribe((data:any[])=>{
      // console.log(data);
       this.M_Sport=data;
       this.ListMemberSport=data;
       console.log("EbrahimMEMBERSport",this.ListMemberSport);
       //console.log("EBRAHIM2",this.M_Sport);
     });





    this.ReciveProgramSport =this. frmbuilder.group ({
      NameProgramSport: new FormControl(null, [Validators.required,Validators.minLength(7)]),
   //   ProgramSport: new FormControl(null, [Validators.required]),
      MemberSportArray: new FormControl(null),
      FieldSportArray:new FormControl(null),
      HallSportArray:new FormControl(null),
   

    //  HallSport: new FormControl(null, [Validators.required]),
      ProgramSportFromDate: new FormControl(null, [Validators.required]),
      ProgramSportToDate: new FormControl(null, [Validators.required]),
      ProgramSportDetails: new FormControl(null, [Validators.required,Validators.minLength(7)]),
      ProgramSportAbsence: new FormControl(null, [Validators.required,Validators.minLength(2)]),
      ProgramSportDate: new FormControl('', [Validators.required])

      });
   }
   get f(){
    return this.ReciveProgramSport.controls;
  }
 
  selectChange(items) 
  {
this.ItemDay=parseInt(items);

  }
  ngOnInit(): void {
    this.InitForm();
 
  }
  PostDataProgramSport(ReciveProgramSport){
    if (this.ReciveProgramSport.invalid) {
      return;
  }
  this.HallSport= this.ListHallSport.find(date=>date.Id===+this.ReciveProgramSport.value.HallSportArray);
this.FieldSport=this.ListFieldSport.find(date=>date.Id===+this.ReciveProgramSport.value.FieldSportArray);

//this.MemberSport=new AuthMemberSportOutPut();
 
 this.MemberSport=this.M_Sport.find(date=>date.Id==+this.ReciveProgramSport.value.MemberSportArray);
  let Value:ProgramSport={
FromDate:this.ReciveProgramSport.value.ProgramSportFromDate,
ToDate:this.ReciveProgramSport.value.ProgramSportFromDate,
Id:null,
NameProgram:this.ReciveProgramSport.value.NameProgramSport,
AbsenceCost:+this.ReciveProgramSport.value.ProgramSportAbsence,
DetailsSport:this.ReciveProgramSport.value.ProgramSportDetails,
// F_Sport:this.FieldSport,
F_Sport:null,

H_Sport:null,
// H_Sport:this.HallSport,
//M_Sport:this.MemberSport,
//M_Sport:this.MemberSport,

M_Sport:null,
E_Sport:undefined,
FieldSportRef:this.FieldSport.Id,
HallSportRef:this.HallSport.Id,
PMemberSportRef:this.M_Sport.find(date=>date.Id==+this.ReciveProgramSport.value.MemberSportArray).Id,
DaysOfYear:null,
Day:null,
ProgramSportId:1
  } 
 

 
 

 //Value.DaysOfYear=Days.One;
 let number =  parseInt(this.ReciveProgramSport.value.ProgramSportDate)  ;
 //let y=this.ItemDay;
 
 if (number=1) {
  Value.DaysOfYear=Days.One;
  Value.Day="شنبه";
 
 }
  else if(number=2) {
  Value.DaysOfYear=Days.Two;
  Value.Day="یک شنبه";

   
 }

else if(number=3) {
  Value.DaysOfYear=Days.Three;
  Value.Day="دوشنبه";

   
}
else if(number=4) {
  Value.DaysOfYear=Days.OneWeek;
  Value.Day="سه شنبه";

   
}
else if(number=5) {
  Value.DaysOfYear=Days.TwoWeek
  Value.Day="چهارشنبه";

   
}
else if(number=6) {
  Value.DaysOfYear=Days.ThreeWeek
  Value.Day="پنج شنبه";

   
}
else if(number=7) {
  Value.DaysOfYear=Days.OneMonth
  Value.Day="جمعه";

}

 
 
 this.programservices.AddProgramSport(Value).subscribe((date:ProgramSport[])=>
 {
 this.ListProgramSport=date;
 console.log("EBRAHIMVALUE",date);
  }
 );
 let confirmDialog;
 if (this.ListProgramSport!==null) {
  confirmDialog  = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      title: 'ثبت برنامه ورزشی',
      message: 'ثبت برنامه ورزشی شما با موفقیت انجام شد'
    }
  });
 } else {
   confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      title:  'ثبت خطا',
      message:'وجود خطا در ثبت برنامه ورزشی'
    }
  });
 }
  

  }

}

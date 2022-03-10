import { Component, OnInit } from '@angular/core';
import { ProgramSport } from 'src/app/Shared/Models/ProgramSport';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';

import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { MemberSport } from 'src/app/Shared/Models/MemberSport';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { tap } from 'rxjs/operators';
import { AuthMemberSport, AuthMemberSportOutPut } from 'src/app/Shared/Interface/auth-member-sport';
 import { Days } from 'src/app/Shared/Models/Days';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
@Component({
  selector: 'app-edit-programsport',
  templateUrl: './edit-programsport.component.html',
  styleUrls: ['./edit-programsport.component.css']
})
export class EditProgramsportComponent implements OnInit {
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


  E_Sport:AuthEventSport[]=[];
     M_Sport:AuthMemberSportOutPut[]=[];
  H_Sport:HallSport[];
  ListHallSport:HallSport[];
  HallSport:HallSport;
  F_Sport:FieldSport[]=[];
  FieldSport:FieldSport;
  ListFieldSport:FieldSport[]=[];
  ListMemberSport:AuthMemberSport[]=[];

  MemberSport:MemberSport;
ListProgramSport:ProgramSport[]=[];
 
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  public  ErrorMessage: string;
  private ProgramSport: ProgramSport ;
  private AuthProgramSport:AuthProgramSport;
  ReciveProgramSport: FormGroup ;
  imageSrc: string;
  ItemDay:number;
  constructor(private frmbuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditProgramsportComponent>,
              private dialog: MatDialog,
              private FieldServices:FieldSportServicesService,
              private MemberSportServices:MemberSportServicesService,
              private HallServices:HallSportServicesService,
              private EventServices:EventSportServicesService,
              private programservices: ProgramSportServicesService,
              private ServiceProgram: ProgramSportServicesService) { }

  ngOnInit(): void {
    const IdMemberSport =+window.localStorage.getItem('IdProgramsportEdit');
 this.ServiceProgram.FindProgramSport(IdMemberSport).subscribe( result => this.AuthProgramSport  = result,

      error =>  console.log(error),

   );
   this.IniitDate();

  }


  IniitDate(){
    const IdProgramsport =+window.localStorage.getItem('IdProgramsportEdit');
   
       let items:any;
    
       this.ServiceProgram.FindProgramSport(IdProgramsport).pipe(
        tap(data=>{
         
         console.log(data);
                this.AuthProgramSport=data;
    
         items=data;
      
         this.InitForm();
        })).subscribe((data:AuthProgramSport)=>{
    
   
          
         console.log("EbrahimProgram",this.AuthProgramSport);
         //console.log("EBRAHIM2",this.M_Sport);
       });
  
  
  }

  selectChange(items) 
  {
this.ItemDay=parseInt(items);

  }
  InitForm(){
    this.H_Sport=[];
    this.ListHallSport=[];
    this.F_Sport=[];
    this.ListFieldSport=[];
 
   // this.MemberSportServices.ReciveMemberSport().subscribe(x=>this.MemberSporList=x);
 
  
       
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
      NameProgramSport: new FormControl(this.AuthProgramSport.NameProgram, [Validators.required,Validators.minLength(7)]),
   //   ProgramSport: new FormControl(null, [Validators.required]),
      MemberSportArray: new FormControl(null),
      FieldSportArray:new FormControl(null),
      HallSportArray:new FormControl(null),
   

      HallSport: new FormControl(null, [Validators.required]),
      ProgramSportFromDate: new FormControl(this.AuthProgramSport.FromDate, [Validators.required]),
      ProgramSportToDate: new FormControl(this.AuthProgramSport.ToDate, [Validators.required]),
      ProgramSportDetails: new FormControl(this.AuthProgramSport.DetailsSport, [Validators.required,Validators.minLength(7)]),
      ProgramSportAbsence: new FormControl(this.AuthProgramSport.AbsenceCost, [Validators.required,Validators.minLength(2)]),
      ProgramSportDate: new FormControl(this.AuthProgramSport.DaysOfYear, [Validators.required])

      });
   }
  get f() {

    return this.ReciveProgramSport.controls;

  }
  PostDataProgramSport(ReciveProgram){
    const IdMemberSport =+window.localStorage.getItem('IdProgramsportEdit');
    this.HallSport= this.ListHallSport.find(date=>date.Id===+this.ReciveProgramSport.value.HallSportArray);
   // this.FieldSport=this.ListFieldSport.find(date=>date.Id===+this.ReciveProgramSport.value.FieldSportArray);
    
    //this.MemberSport=new AuthMemberSportOutPut();
     
   //  this.MemberSport=this.M_Sport.find(date=>date.Id==+this.ReciveProgramSport.value.MemberSportArray);
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
  // FieldSportRef:this.ListFieldSport.find(date=>date.Id==+this.ReciveProgramSport.value.FieldSportArray).Id,
FieldSportRef:this.ListFieldSport.find(date=>date.Id==+this.ReciveProgramSport.value.FieldSportArray).Id,
HallSportRef:this.ListHallSport.find(date=>date.Id==+this.ReciveProgramSport.value.HallSportArray).Id,
//FieldSportRef:this.AuthProgramSport.FieldSportRef,

PMemberSportRef:1,
   //  MemberSportArray: new FormControl(null),
   //   FieldSportArray:new FormControl(null),
    //  HallSportArray:new FormControl(null),

DaysOfYear:null,
Day:"نامشخص",
ProgramSportId:1
  } 
 Value.PMemberSportRef=this.ReciveProgramSport.value.MemberSportArray;

 Value.ProgramSportId=null;
 


 let number =  parseInt(ReciveProgram.value.ProgramSportDate)  ;
 
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
//alert(Value.Day);
 
 

this.ServiceProgram.UpdateProgramSport(IdMemberSport,Value).pipe(
  tap
  (res=>
    {
    console.log(res);
 
     },error=>
  {
 
    console.log('error:',error);

 
  }
  )
  
).subscribe((res:any)=>{
  console.log("UpdateProgramSport:",res);
});




  
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش برنامه ورزشی',
        message: 'ویرایش برنامه ورزشی  با موفقیت انجام شد'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });

  }


}

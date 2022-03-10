import { Component, OnInit } from '@angular/core';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { EventSport } from 'src/app/Shared/Models/EventSport';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
import { UpperCasePipe } from '@angular/common';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { AuthRoleAccess } from 'src/app/Shared/Interface/auth-role-access';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';

@Component({
  selector: 'app-edit-eventsport',
  templateUrl: './edit-eventsport.component.html',
  styleUrls: ['./edit-eventsport.component.css']
})
export class EditEventsportComponent implements OnInit {
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  P_Sport:AuthProgramSport[];
  H_Sport: AuthHallSport[];
  R_Access:AuthRoleAccess[];
  F_Sport:AuthFieldSport[];
  HallSport: AuthHallSport;
  FieldSport: AuthFieldSport;
  ProgramSport: AuthProgramSport;
 


public ErrorMessage : string;
  private EventSport: EventSport ;
  
  ReciveEventSport: FormGroup ;
  public AuthEvent :AuthEventSport;
  constructor(public dialogRef: MatDialogRef<EditEventsportComponent>
    ,private ProgramServices:ProgramSportServicesService
    ,private FieldServices:FieldSportServicesService
    , private HallService:HallSportServicesService,
              private dialog: MatDialog,
  private frmbuilder: FormBuilder,private ServiceEditEvent: EventSportServicesService) { }



  ngOnInit(): void {  
    const IdEventSport = +window.localStorage.getItem('IdEventsportEdit');
    this.ReciveEventSport = new FormGroup ({

      NameEvent: new FormControl(null),
      // NameEventResult: new FormControl(null, Validators.required),
       // ProgramSport: new FormControl(null, Validators.required),
       // FieldSport: new FormControl(null, Validators.required),
       // HallSport: new FormControl(null, Validators.required),
       HallSportArray:new FormControl(null),
       ProgramSportArray:new FormControl(null),
       FieldSportArray:new FormControl(null),
  
       FromDate: new FormControl(null),
       ToDate: new FormControl(null),
       NameCoach: new FormControl(null)
      });
    
    this.ServiceEditEvent.FindEventSport(IdEventSport).subscribe( result =>
      {
      this.AuthEvent=result,
      this.IniitForm()
    }
   
     , error =>  console.log(error),

   );


   this.InitDate();
   // this.IniitForm();



    //    error =>  console.log(error),




    //    );

     
  }
  InitDate(){
    const IdEventSport = +window.localStorage.getItem('IdEventsportEdit');
    // this.ServiceEditEvent.FindEventSport(IdEventSport).subscribe((data:any)=>{
    //   console.log(data);
    //  // this.ProgramSport=data;
    //   this.AuthEvent=data;
    //   console.log("AuthEvent",this.AuthEvent);
    //   //console.log("EBRAHIM2",this.M_Sport);
    // });
    this.ProgramServices.ReciveProgramSport().subscribe((data:any[])=>{
      console.log(data);
     // this.ProgramSport=data;
      this.P_Sport=data;
      console.log("EbrahimProgramSport",this.P_Sport);
      //console.log("EBRAHIM2",this.M_Sport);
    });

 
    this.FieldServices.ReciveFieldSport().subscribe((data:any[])=>{
      console.log(data);
      
      this.F_Sport=data;
       
      console.log("EbrahimFieldSportList",this.F_Sport);
      //console.log("EBRAHIM2",this.M_Sport);
    });
    this.HallService.ReciveHallSport().subscribe((data:any[])=>{
      console.log(data);
      
   
      this.H_Sport=data;
      console.log("EbrahimHallSport",this.H_Sport);
      //console.log("EBRAHIM2",this.M_Sport);
    });
   
  }


  IniitForm(){
    this.ReciveEventSport.get("NameEvent").setValue(this.AuthEvent.NameEvent);
    this.ReciveEventSport.get("FromDate").setValue(this.AuthEvent.FromDate);
    this.ReciveEventSport.get("ToDate").setValue(this.AuthEvent.ToDate);
    this.ReciveEventSport.get("NameCoach").setValue(this.AuthEvent.RefeRee);


    // this.ReciveEventSport.patchValue ({

    //   NameEvent: new FormControl(this.AuthEvent.NameEvent),
    //   // NameEventResult: new FormControl(null, Validators.required),
    //    // ProgramSport: new FormControl(null, Validators.required),
    //    // FieldSport: new FormControl(null, Validators.required),
    //    // HallSport: new FormControl(null, Validators.required),
    //    HallSportArray:new FormControl(null),
    //    ProgramSportArray:new FormControl(null),
    //    FieldSportArray:new FormControl(null),
 
    //    FromDate: new FormControl(this.AuthEvent.FromDate),
    //    ToDate: new FormControl(this.AuthEvent.ToDate),
    //    NameCoach: new FormControl(this.AuthEvent.RefeRee)
    //   });

  }
    // tslint:disable-next-line: typedef
  get f() {

    // tslint:disable-next-line: no-unused-expression
    return this.ReciveEventSport.controls;

  }
  // tslint:disable-next-line: typedef
  PostData(ReciveEventSport){
    const IdEventSportedit = window.localStorage.getItem('IdEventsportEdit');
    this.HallSport= this.H_Sport.find(date=>date.Id===+this.ReciveEventSport.value.HallSportArray);
    this.FieldSport=this.F_Sport.find(date=>date.Id===+this.ReciveEventSport.value.FieldSportArray);
   this.ProgramSport=this.P_Sport.find(date=>date.Id===+this.ReciveEventSport.value.ProgramSportArray);
    let Value:EventSport={
      FromDate:this.ReciveEventSport.value.FromDate,
      ToDate:this.ReciveEventSport.value.ToDate,
      RefeRee:this.ReciveEventSport.value.NameCoach,
      NameEvent:this.ReciveEventSport.value.NameEvent,
      P_Sport:null,
      HallSport:null,
      EventResult:null,
      Id:null,
      F_Sport:null,
      FieldSportRef:this.FieldSport.Id,
      HallSportRef:this.HallSport.Id,
      ProgramSportRef:this.ProgramSport.Id,
      R_AccessRef:0,
      RoleAccess:null
      
      
      
      
      };
      Value.Id==null;
      Value.R_AccessRef==null;



    this.ServiceEditEvent.UpdateEventSport(IdEventSportedit,Value).subscribe(
      error=>console.log(error)
    );
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {HallSportServicesService} from '../../Services/hall-sport-services.service';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { ServicesSportServiceService } from 'src/app/Services/services-sport-service.service';
import { MemberSport, MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import { AuthMemberSport } from 'src/app/Shared/Interface/auth-member-sport';
import { AuthServicesSport } from 'src/app/Shared/Interface/auth-services-sport';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { ServicesSport } from 'src/app/Shared/Models/ServicesSport';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { MemberServicesService } from 'src/app/Services/member-services.service';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';
import { AuthMember } from 'src/app/Shared/Interface/auth-member';
import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
 
@Component({
  selector: 'app-hall-sport',
  templateUrl: './hall-sport.component.html',
  styleUrls: ['./hall-sport.component.css']
})

export class HallSportComponent implements OnInit {
 
  
  ReciveHallSport: FormGroup ;
  private AuthEventList:AuthEventSport[]=[];
  private AuthHallSport: AuthHallSport[] = [];
  private ListHallSport:HallSport[]=[];
  private AuthServicesSport:AuthServicesSport[]=[];
  private AuthProgramSport:AuthProgramSport[]=[];
  private  MemberSport:MemberSportOutPut; 
  subscription: Subscription;

  M_Sport:MemberSport[];
  ListMemberSport:MemberSportOutPut[];
  constructor(private frmbuilder: FormBuilder,
              private dialog: MatDialog,
              private ServicesSport:ServicesSportServiceService,
              private EventService:EventSportServicesService,
              private ProgramServices:ProgramSportServicesService,
              private MemberSerivces:MemberServicesService,
              private MemberSportSerivces:MemberSportServicesService,
              private HallService: HallSportServicesService) {}
  get f() {

    return this.ReciveHallSport.controls;

  }

  // P_Sport:AuthProgramSport[];
  // S_Sport:AuthServicesSport[];
  // E_Sport:AuthEventSport[];

  InitForm()
  {

 this.M_Sport=[];
 this.ListMemberSport=[];
    
 this.MemberSportSerivces.ReciveMemberSport().subscribe((data:any[])=>{
   console.log(data);
   this.M_Sport=data;
   this.ListMemberSport=data;
   console.log("EbrahimMemberSport",this.ListMemberSport);
   //console.log("EBRAHIM2",this.M_Sport);
 });


    

    this.ReciveHallSport = this. frmbuilder.group ({
      Name: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      // EventSport: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      // ServiceSport: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      // ProgramSport: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      MemberSportArray: new FormControl(null),
 

     
      });
      this.M_Sport.filter(x=> x.hallSportRef==0);
     
    
     
   }
  ngOnInit(): void {

    this.InitForm();
 
 

  }
  PostDataHallSport(ReciveHallSport){

    if (this.ReciveHallSport.invalid) {
         return;
     }
      
 
     let Value:HallSport={
       Name:ReciveHallSport.value.Name,
      // M_Sport:null,

      MemberSportRef:this.ReciveHallSport.value.MemberSportArray,
      M_Sport: undefined,

      Id:123,
     };
  
    this.MemberSport=this.ListMemberSport.find(date=>date.Id==this.ReciveHallSport.value.MemberSportArray);
 
 let MemSport:MemberSport={
id:this.MemberSport.Id,
fullName:this.MemberSport.FullName,
ncode:this.MemberSport.Ncode,
photo:this.MemberSport.Photo,
hallSportRef:this.MemberSport.HallSportRef,

 };
 Value.M_Sport=MemSport;

     
Value.M_Sport.id=null;
 
  


    console.log("EBRAHIMFETCH!",Value.M_Sport.fullName);
   
    // console.log("EBRAHIMFETCH!",Value.M_Sport.FullName);
     
 
 
 
    
   
     
    this.HallService.AddHallSport(Value).subscribe((date:any[])=>
    {
    this.ListHallSport=date;
    this.HallService.HallSportChanged.next( this.ListHallSport);
    this.ngOnInit();
    console.log("EBRAHIMVALUE",date);
     }
    );
 
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ثبت سالن ورزشی',
        message: 'ثبت سالن ورزشی موفقیت انجام شد'
      }
    });


      }


}

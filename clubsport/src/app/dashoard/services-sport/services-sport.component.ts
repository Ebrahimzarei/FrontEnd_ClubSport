import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ServicesSportServiceService} from '../../Services/services-sport-service.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { tap } from 'rxjs/operators';
import { ServicesSport } from 'src/app/Shared/Models/ServicesSport';
import { AuthServicesSport } from 'src/app/Shared/Interface/auth-services-sport';

@Component({
  selector: 'app-services-sport',
  templateUrl: './services-sport.component.html',
  styleUrls: ['./services-sport.component.css']
})
export class ServicesSportComponent implements OnInit {

  public options: string[] = ['Test1', 'Test', 'Test'];
  ReciveServicesSport: FormGroup ;
  private HallSportList:AuthHallSport[]=[];
  private ServicesSportList:ServicesSport[]=[];
  private AuthServicesSportList:AuthServicesSport[]=[];


   H_Sport:AuthHallSport[]=[];
   HallSport: AuthHallSport;

  constructor(private frmbuilder: FormBuilder,
              private dialog: MatDialog,
              private HallServices:HallSportServicesService,
              private serservices: ServicesSportServiceService) {


  }
  InitDate(){
    this.HallServices.ReciveHallSport().subscribe((data:any[])=>{
      console.log(data);
      
      this.HallSportList=data;
      this.H_Sport=data;
      console.log("EbrahimFieldSportList",this.HallSportList);
      //console.log("EBRAHIM2",this.M_Sport);
    });
    this.InitForm();

    // this.HallServices.ReciveHallSport().pipe(
    //   tap(data=>{
       
    //    console.log(data);
    //           this.HallSportList=data;
    //   this.H_Sport=data;
  
     
    
   
    //   })).subscribe((data:any[])=>{
  
 
        
    //    console.log("EbrahimHMember",this.H_Sport);
    //    //console.log("EBRAHIM2",this.M_Sport);
    //  });
  }
  InitForm(){
 





    this.ReciveServicesSport = this. frmbuilder.group ({
      ServicesName: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      HallSportArray: new FormControl(null),
      ServicesSportDetails: new FormControl(null, [Validators.required,Validators.minLength(5)])

    });
  }
  get f() {
    return this.ReciveServicesSport.controls;
  }
  PostDataServicesSport(ReciveServicesSport){
    if(this.ReciveServicesSport.invalid){
      return;

    }

  this.HallSport= this.HallSportList.find(date=>date.Id===+this.ReciveServicesSport.value.HallSportArray);
 let Value:ServicesSport={
NameService:this.ReciveServicesSport.value.ServicesName,
 CoachSport:this.ReciveServicesSport.value.ServicesSportDetails,
 H_sport:null,
 HallSportRef:this.HallSport.Id,
 Id:21,
 ServiceId:22,
 };

    this.serservices.AddServicesSport(Value).subscribe((date:any[])=>
    {
   // this.ProgramList=date;
    this.ServicesSportList=date;
this.AuthServicesSportList=date;
 //   console.log("EBRAHIMVALUE",date);
     }
    );
    let confirmDialog;
  


    if (this.ServicesSportList!==null) {
      confirmDialog  = this.dialog.open(ConfirmationDialogComponent, {
        data: {
         title: 'ثبت رویداد',
         message: 'ثبت رویداد شما با موفقیت انجام شد'
        }
 
      }
      ) ;
 
      this.ReciveServicesSport.clearValidators();
      this.ReciveServicesSport.reset();
     } 
     
     else {
       confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title:  'ثبت خطا',
          message:'وجود حطا درثبت رویداد'
        }
      });
     }
 

}

  ngOnInit(): void {
    this.InitDate();
  }





}

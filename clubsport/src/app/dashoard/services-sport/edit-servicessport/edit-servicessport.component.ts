import { Component, OnInit } from '@angular/core';
import { ServicesSport } from 'src/app/Shared/Models/ServicesSport';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicesSportServiceService } from 'src/app/Services/services-sport-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { AuthServicesSport } from 'src/app/Shared/Interface/auth-services-sport';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { tap } from 'rxjs/operators';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
@Component({
  selector: 'app-edit-servicessport',
  templateUrl: './edit-servicessport.component.html',
  styleUrls: ['./edit-servicessport.component.css']
})
export class EditServicessportComponent implements OnInit {
  public options: string[] = ['Test1', 'Test', 'Test'];
  ReciveServicesSport: FormGroup ;
  private HallSportList:AuthHallSport[]=[];
  private AuthServicesSport:AuthServicesSport;
   H_Sport:AuthHallSport[]=[];
  constructor(public dialogRef: MatDialogRef<EditServicessportComponent>,
    private HallServices:HallSportServicesService,
    private frmbuilder: FormBuilder, private ServiceSport: ServicesSportServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  IniitDate(){

    this.HallServices.ReciveHallSport().subscribe((data:any[])=>{
      console.log(data);
      
      this.HallSportList=data;
      this.H_Sport=data;
      console.log("EbrahimHallSportList",this.HallSportList);
      //console.log("EBRAHIM2",this.M_Sport);
    });

    const IdSport =+window.localStorage.getItem('IdServicessportEdit');
  
   
       let items:any;
    
       this.ServiceSport.FindServicesSport(IdSport).pipe(
        tap(data=>{
         
         console.log(data);
                this.AuthServicesSport=data;
    
         items=data;
      
         this.IniitForm();
        })).subscribe((data:AuthServicesSport)=>{
    
   
          
  
        console.log("EBRAHIMAuthServicesSport");
       });
  
      
  
  }

  IniitForm(){
    this.ReciveServicesSport = this.frmbuilder.group ({

      ServicesName: new FormControl(this.AuthServicesSport.NameService, [Validators.required,Validators.minLength(5)]),
      HallSportArray: new FormControl(),
      ServicesSportDetails: new FormControl('null', [Validators.required,Validators.minLength(5)])
     
   //   ServicesSportDetails: new FormControl(this.ServicesSport., [Validators.required,Validators.minLength(5)])
      });

  }
  get f() {

    return this.ReciveServicesSport.controls;

  }
  PostDataServicesSport(ReciveServicesSport){
    this.ServiceSport.UpdateServicesSport(this.AuthServicesSport.Id,ReciveServicesSport).subscribe(error=>
  console.log(error)
      );
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش خدمات',
        message:'خدمات با موفقیت ویرایش شد'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });

  }

}

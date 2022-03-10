import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { tap } from 'rxjs/operators';
import { MemberSport, MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';

@Component({
  selector: 'app-edit-hallsport',
  templateUrl: './edit-hallsport.component.html',
  styleUrls: ['./edit-hallsport.component.css']
})

export class EditHallsportComponent implements OnInit {
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  M_Sport:MemberSportOutPut[];
  M_SportTwo:MemberSportOutPut[];
  public FilterMember:MemberSportOutPut;
  public  ErrorMessage: string;
  private HallSport: HallSport ;
  ReciveHallSport: FormGroup ;
  private AuthHallSport:AuthHallSport;
  constructor(private frmbuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditHallsportComponent>,
              private dialog: MatDialog,
              private MemberSportSerivces:MemberSportServicesService,
              private ServiceHall: HallSportServicesService) { }

  ngOnInit(): void {
  
this.IniitDate();


}
IniitDate(){

 this.M_Sport=[];

     this.M_SportTwo=[];



this.MemberSportSerivces.ReciveMemberSport().pipe(
  tap(data=>
    {
      this.M_Sport=data;
 
    this.M_SportTwo=data;
      let ValueMemberRef=+this.AuthHallSport.MemberSportRef;
    

         //عدم انتخاب سالنی که ورزشکار دارد

    this.M_Sport=this.M_Sport.filter(item => item.HallSportRef === 0);
   
 
 
     this.FilterMember=this.M_SportTwo.find(x=>x.Id===ValueMemberRef);
       this.ReciveHallSport.controls['MemberSportRef'].
      setValue(this.FilterMember, {onlySelf: true});
 // const IdHallSport =+window.localStorage.getItem('IdHallsportEdit');

    
   

    
     
    }
    )
).subscribe((data:MemberSportOutPut[])=>{

})




  const IdHallSport =+window.localStorage.getItem('IdHallsportEdit');

 
     let items:any;
  
     this.ServiceHall.FindHallSport(IdHallSport).pipe(
      tap(data=>{
       
       console.log(data);
              this.AuthHallSport=data;
  
       items=data;
      //  this.FilterMember=this.M_SportTwo.find(x=>x.Id===IdHallSport);
      //  this.ReciveHallSport.controls['MemberSportRef'].
      // setValue(this.FilterMember, {onlySelf: true});
    
       this.IniitForm();
      })).subscribe((data:AuthHallSport)=>{
  
 
        

      console.log("EBRAHIM2");
     });


}
IniitForm(){
  this.ReciveHallSport = this.frmbuilder.group ({
    Name: new FormControl(this.AuthHallSport.Name, [Validators.required,Validators.minLength(5)]),
    MemberSportRef: new FormControl(null),
    
    });

}
  get f() {

    return this.ReciveHallSport.controls;

  }
  // tslint:disable-next-line: typedef
  PostDataHallSport(ReciveHallSport){
    const IdHallSport =+window.localStorage.getItem('IdHallsportEdit');
      let ValHallSport:HallSport={
       Name:ReciveHallSport.value.Name,
      // M_Sport:null,

      MemberSportRef:this.ReciveHallSport.value.MemberSportRef,
      M_Sport: undefined,

      Id:123,
     };
     ValHallSport.Id=null;
var  x=this.ReciveHallSport;
    this.ServiceHall.UpdateHallSport(IdHallSport,ReciveHallSport.getRawValue()).subscribe(error=>console.log(error));
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش سالن ورزشی',
        message:'سالن ورزشی شما با موفقیت ویرایش شد'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { MemberSport, MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { AuthMemberSport } from 'src/app/Shared/Interface/auth-member-sport';

@Component({
  selector: 'app-edit-membersport',
  templateUrl: './edit-membersport.component.html',
  styleUrls: ['./edit-membersport.component.css']
})
export class EditMembersportComponent implements OnInit {
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  public  ErrorMessage: string;
  private MemberSport: MemberSportOutPut ;
  ReciveMemberSport: FormGroup ;
  imageSrc: string;
  constructor(private frmbuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditMembersportComponent>,
              private dialog: MatDialog,
              private ServiceMemberSport: MemberSportServicesService) {


  }


  get f() {

    return this.ReciveMemberSport.controls;

  }

  ngOnInit(): void {
 this.IniitDate();
 
  }
  IniitDate(){
    const IdMemberSport =+window.localStorage.getItem('IdMemberSportEdit');
   
       let items:any;
    
       this.ServiceMemberSport.FindMemberSport(IdMemberSport).pipe(
        tap(data=>{
         
         console.log(data);
                this.MemberSport=data;
    
         items=data;
      
         this.IniitForm();
        })).subscribe((data:MemberSportOutPut)=>{
    
   
          
         console.log("EbrahimHMember",this.MemberSport);
         //console.log("EBRAHIM2",this.M_Sport);
       });

  
  
  }
  IniitForm(){
    this.ReciveMemberSport = this.frmbuilder.group ({
      FullName: new FormControl(this.MemberSport.FullName, [Validators.required,Validators.minLength(5)]),
      Ncode: new FormControl(this.MemberSport.Ncode, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/), Validators.minLength(10) ]),
      Photo: new FormControl(),
      
      fileSource: new FormControl('', [Validators.required])
    });
    this.imageSrc=this.MemberSport.Photo;

  }
  PostDataMemberSport(ReciveMemberSport){
    const IdMemberSport =+window.localStorage.getItem('IdMemberSportEdit');
 this.ReciveMemberSport.value.Photo=this.imageSrc;
 let user:MemberSport={id:1212,
  fullName:null,



   ncode:null,

   photo:null,

};
user.fullName=ReciveMemberSport.value.FullName;
user.ncode=ReciveMemberSport.value.Ncode;
user.photo=this.imageSrc;
user.id=null;

 

  


 
    this.ServiceMemberSport.UpdateMemberSport(IdMemberSport,ReciveMemberSport.getRawValue()).subscribe(error=>console.log(error));
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش ورزشکار',
        message: 'ورزشکار باشگاه با موفقیت ویرایش شد'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
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
       // alert(reader.result.toString());
      //  this.getBase64(event);


        this.ReciveMemberSport.patchValue({
          fileSource: reader.result,
      // MemberRegPhoto : reader.result as string
        });
      };
    }
  }

}

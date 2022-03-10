import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Member } from 'src/app/Shared/Models/Member';
import { MemberServicesService } from 'src/app/Services/member-services.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthMember } from '../../../Shared/Interface/auth-member';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-edit-memberregister',
  templateUrl: './edit-memberregister.component.html',
  styleUrls: ['./edit-memberregister.component.css']
})
export class EditMemberregisterComponent implements OnInit {
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  public  ErrorMessage: string;
  private MemberSport: Member ;
  private AuthMemberReg: AuthMember;
  private  Member: AuthMember={FatherName:'',Password:'',Photo:'',R_Access:null,FullName:'',Id:null,Natinalcode:123,Role:'',Token:'',UserName:'',
};
 
  public FullName:string;

  ReciveMember: FormGroup ;
  imageSrc: string;
  constructor(private frmbuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditMemberregisterComponent>,
              private dialog: MatDialog,
              private ServiceMember: MemberServicesService) { }

  ngOnInit(): void {


 this.IniitDate();


  }

IniitDate(){
  const IdMemberSport =+window.localStorage.getItem('IdMemberRegEdit');
 
     let items:any;
  
     this.ServiceMember.FindMember(IdMemberSport).pipe(
      tap(data=>{
       
       console.log(data);
              this.AuthMemberReg=data;
      this.Member=data;
    this.FullName=data.FullName,
       items=data;
    
       this.IniitForm();
      })).subscribe((data:AuthMember)=>{
  
 
        
       console.log("EbrahimHMember",this.AuthMemberReg);
       //console.log("EBRAHIM2",this.M_Sport);
     });


}
  IniitForm()
  {

   


    this.ReciveMember = this.frmbuilder.group ({
   FullName: new FormControl(this.Member.FullName, [ Validators.required, Validators.minLength(5)]),
    // tslint:disable-next-line: max-line-length   
    Role: new FormControl( [Validators.required]),
    UserName: new FormControl(this.Member.UserName, [Validators.required, Validators.minLength(5)]),
    Password: new FormControl(this.Member.Password, [Validators.required, Validators.minLength(5)]),
    Natinalcode: new FormControl(this.Member.Natinalcode, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]),
    FatherName: new FormControl(this.Member.FatherName, [Validators.required,Validators.minLength(3)]),
    Photo: new FormControl(),
    fileSource: new FormControl('', [Validators.required])
    });
    //alert(this.Member.Role)
  if(this.Member.Role=null){
     // this.ReciveMember.patchValue({Role:'User', tc:true});
  
    }
    let succes=!this.Member.Role;
    if (succes) {
          this.ReciveMember.patchValue({Role:'User', tc:true});
    }
let adminvalue=this.Member.Role.startsWith("Admin");
    if (this.Member.Role.startsWith("Admin")){
 
this.ReciveMember.patchValue({Role:'Admin', tc:true});


 
    }
    else if(this.Member.Role=="User"){
     // alert('user')
  
      this.ReciveMember.patchValue({Role:'User', tc:true});
    }
 


  }
  get form() {

    return this.ReciveMember.controls;

  }
  // tslint:disable-next-line: typedef
  PostDataMemberRegister(ReciveMember){
    const IdMemberSport =+window.localStorage.getItem('IdMemberRegEdit');
    // this.ReciveMember.get("Photo").setValue(this.AuthEvent.NameEvent);
    this.ReciveMember.get("Photo").value;
   // alert( this.ReciveMember.get("Photo").value);
 

    // this.ServiceMember.UpdateMember(IdMemberSport,ReciveMember.getRawValue()).subscribe((data: 
    //   {}) => {
    //        // this.router.navigate(['/employees-list'])
    //       })
    //       alert('SUCCESS!! :-)\n\n' + 
    //   JSON.stringify(this.ReciveMember.getRawValue())

    //   )
   // ReciveMember.value.Photo=ReciveMember.value.fileSource;
    this.ServiceMember.UpdateMember(IdMemberSport,ReciveMember.getRawValue())
    .subscribe(error=>console.log(error));
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش کاربر',
        message:'کاربر شما با موفقیت ویرایش شد'
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

 
        this.ReciveMember.patchValue({
          fileSource: reader.result,
          Photo:reader.result
      // MemberRegPhoto : reader.result as string
        });
      };
    }
  }
}

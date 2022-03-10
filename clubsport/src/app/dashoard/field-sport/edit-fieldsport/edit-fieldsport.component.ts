import { Component, OnInit } from '@angular/core';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-fieldsport',
  templateUrl: './edit-fieldsport.component.html',
  styleUrls: ['./edit-fieldsport.component.css']
})
export class EditFieldsportComponent implements OnInit {
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  public  ErrorMessage: string;
  private FieldSport: FieldSport ;
  private AuthField :AuthFieldSport;
  ReciveFieldSport: FormGroup ;

  constructor(private frmbuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditFieldsportComponent>,
              private dialog: MatDialog,
              private ServiceField: FieldSportServicesService) { }
  // tslint:disable-next-line: typedef
  get f() {

    return this.ReciveFieldSport.controls;

  }
  ngOnInit(): void {
 this.IniitDate();
  }

  IniitDate(){

    const IdFieldSport =+window.localStorage.getItem('IdFieldsportEdit');
    let items:any;
    this.ServiceField.FindFieldSport(IdFieldSport).pipe(
      tap(data=>{
        console.log(data);
        this.AuthField=data;

 items=data;
 this.IniitForm();
      })
    
    ).subscribe((data:AuthFieldSport)=>{

     } );
  }
  // tslint:disable-next-line: typedef
  IniitForm(){

    this.ReciveFieldSport = this.frmbuilder.group ({
      NameField: new FormControl(this.AuthField.NameField, [Validators.required,Validators.minLength(4)]),
      CodeSportField: new FormControl(this.AuthField.CodeSportField, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(2)]),
     

      });

  }
  PostDataField(ReciveFieldSport){
    const IdEventSport =+window.localStorage.getItem('IdFieldsportEdit');
    this.ServiceField.UpdateFieldSport(IdEventSport,ReciveFieldSport.getRawValue()).subscribe(error=>console.log(error));

    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ویرایش رویداد',
        message:'ویرایش رشته ورزشی با موفقیت ویرایش شد'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });

  }


}

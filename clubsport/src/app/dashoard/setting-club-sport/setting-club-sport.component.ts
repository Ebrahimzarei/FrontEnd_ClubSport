import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-setting-club-sport',
  templateUrl: './setting-club-sport.component.html',
  styleUrls: ['./setting-club-sport.component.css']
})
export class SettingClubSportComponent implements OnInit {
  public options: string[] = ['Test1', 'Test', 'Test'];
  ReciveSettingSport: FormGroup ;

  // SettingNameClub = '';
  // SettingNewsClub = '';
  // SettingDateClub = '';
  // SettingPhotoClub = '';
  imageSrc: string;
  constructor(private frmbuilder: FormBuilder,private dialog: MatDialog) {


   }
   get f() {

    return this.ReciveSettingSport.controls;

  }
  InitForm(){
    this.ReciveSettingSport =this. frmbuilder.group ({
      SettingNameClub: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      SettingNewsClub: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      // SettingDateClub: new FormControl(null, [Validators.required]),
      SettingPhotoClub: new FormControl(null, [Validators.required]),
      fileSource: new FormControl('', [Validators.required])

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


        this.ReciveSettingSport.patchValue({
          fileSource: reader.result,
      // MemberRegPhoto : reader.result as string
        });
      };
    }
  }
  ngOnInit(): void {
    this.InitForm();
  }

  PostDataSettingSport(ReciveSettingSport){
    if( ReciveSettingSport.invalid){
      return;

    }
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ثبت تنظیمات',
        message: 'ثبت تنظیمات با موفقیت انجام شد'
      }
    });
      }
}

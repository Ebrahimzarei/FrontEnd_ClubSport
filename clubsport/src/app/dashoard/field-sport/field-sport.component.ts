import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {FieldSportServicesService} from '../../Services/field-sport-services.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';

@Component({
  selector: 'app-field-sport',
  templateUrl: './field-sport.component.html',
  styleUrls: ['./field-sport.component.css']
})
export class FieldSportComponent implements OnInit {
  ReciveFieldSport: FormGroup ;
  public FieldList: AuthFieldSport[] = [];
  public ProgramList:AuthProgramSport[]=[];
  public EventList:AuthEventSport[]=[];
  constructor(private frmbuilder: FormBuilder
    ,private http: HttpClient
    , private FieldService: FieldSportServicesService
    , private ProgramService:ProgramSportServicesService
    , private EventService:EventSportServicesService
    ,  private dialog: MatDialog

             ) {
  }
  get f() {

    return this.ReciveFieldSport.controls;

  }
  // tslint:disable-next-line: typedef
  InitForm(){
  //  this.ProgramService.ReciveProgramSport().subscribe(x=>this.ProgramList=x);
  //  this.EventService.ReciveEventSport().subscribe(x=>this.EventList=x);

    this.ReciveFieldSport = this.frmbuilder.group ({
      NameField: new FormControl(null, [Validators.required,Validators.minLength(4)]),
      CodeSportField: new FormControl(null, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(2)]),
     
      // ProgramSport: new FormControl(null, [Validators.required]),
      // EventSport: new FormControl(null, [Validators.required]),

      });
   }
  ngOnInit(): void {
    this.InitForm();
  }
  PostDataField(ReciveFieldSport)
  {
   // this.InitForm();
    if (ReciveFieldSport.invalid) {
      //   alert(this.ReciveEventSport.err);
         return;
     }
     let Field:FieldSport={
       CodeSportField:+ReciveFieldSport.value.CodeSportField,
       NameField:ReciveFieldSport.value.NameField,

     };
     
    this.FieldService.AddFieldSport(Field).subscribe(date => console.log(date));
 
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'ثبت رشته ورزشی',
        message: 'ثبت رشته ورزشی موفقیت انجام شد'
      }
    });
  }

}

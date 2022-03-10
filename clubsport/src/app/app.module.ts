import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';




import { CommonModule } from '@angular/common';
import { EventSportComponent } from './dashoard/event-sport/event-sport.component';
import { FieldSportComponent } from './dashoard/field-sport/field-sport.component';
import { HallSportComponent } from './dashoard/hall-sport/hall-sport.component';
import { MemberRegisterComponent } from './dashoard/member-register/member-register.component';
import { MemberSportComponent } from './dashoard/member-sport/member-sport.component';
import { ProgramSportComponent } from './dashoard/program-sport/program-sport.component';
import { SelectRoleComponent } from './dashoard/select-role/select-role.component';
import { ServicesSportComponent } from './dashoard/services-sport/services-sport.component';
import { SettingClubSportComponent } from './dashoard/setting-club-sport/setting-club-sport.component';
import { LoginComponent } from './login/login.component';
import { ListEventsportComponent } from './dashoard/event-sport/list-eventsport/list-eventsport.component';
import { EditEventsportComponent } from './dashoard/event-sport/edit-eventsport/edit-eventsport.component';
import { EditFieldsportComponent } from './dashoard/field-sport/edit-fieldsport/edit-fieldsport.component';
import { ListFieldsportComponent } from './dashoard/field-sport/list-fieldsport/list-fieldsport.component';
import { ListHallsportComponent } from './dashoard/hall-sport/list-hallsport/list-hallsport.component';
import { EditHallsportComponent } from './dashoard/hall-sport/edit-hallsport/edit-hallsport.component';
import { ListMemberregisterComponent } from './dashoard/member-register/list-memberregister/list-memberregister.component';
import { EditMemberregisterComponent } from './dashoard/member-register/edit-memberregister/edit-memberregister.component';
import { ListMembersportComponent } from './dashoard/member-sport/list-membersport/list-membersport.component';
import { EditMembersportComponent } from './dashoard/member-sport/edit-membersport/edit-membersport.component';
import { EditProgramsportComponent } from './dashoard/program-sport/edit-programsport/edit-programsport.component';
import { ListProgramsportComponent } from './dashoard/program-sport/list-programsport/list-programsport.component';
import { ListSelectroleComponent } from './dashoard/select-role/list-selectrole/list-selectrole.component';
import { EditSelectroleComponent } from './dashoard/select-role/edit-selectrole/edit-selectrole.component';
import { EditServicessportComponent } from './dashoard/services-sport/edit-servicessport/edit-servicessport.component';
import { ListServicessportComponent } from './dashoard/services-sport/list-servicessport/list-servicessport.component';
import { ListSettingclubsportComponent } from './dashoard/setting-club-sport/list-settingclubsport/list-settingclubsport.component';


import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule, MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportEventsportComponent } from './dashoard/event-sport/report-eventsport/report-eventsport.component';
import { ReportFieldSportComponent } from './dashoard/field-sport/report-field-sport/report-field-sport.component';
import { ReporthallsportComponent } from './dashoard/hall-sport/reporthallsport/reporthallsport.component';
import { ReportMemberRegisterComponent } from './dashoard/member-register/report-member-register/report-member-register.component';
import { ReportMemberSportComponent } from './dashoard/member-sport/report-member-sport/report-member-sport.component';
import { ReportMemberProgramSportComponent } from './dashoard/program-sport/report-member-program-sport/report-member-program-sport.component';
import { ReportServicesComponent } from './dashoard/Services-sport/report-services/report-services.component';
import { HeadersModule } from './module/headers.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptorService } from '../app/Shared/Services/auth-interceptor.services';
import { NotFoundComponent } from './dashoard/not-found-component/not-found-componen';
import { EditStettingComponent } from './dashoard/setting-club-sport/edit-stetting/edit-stetting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyCustomMemberPipe } from './Shared/Pipes/my-custom-member.pipe';
import { ShortNumberPipe } from './Shared/Pipes/ShortNumber.pipe';

import { GetReportsComponent } from './get-reports/get-reports.component';
import { AgGridModule } from 'ag-grid-angular';
 
 
@NgModule({
  declarations: [
  // HeadersModule,

    AppComponent,
   // LoginComponent,
    EventSportComponent,
    FieldSportComponent,
    HallSportComponent,
    MemberRegisterComponent,
    MemberSportComponent,
    ProgramSportComponent,
    SelectRoleComponent,
    ServicesSportComponent,
    SettingClubSportComponent,
    LoginComponent,
    ListEventsportComponent,
    EditEventsportComponent,
    EditFieldsportComponent,
    ListFieldsportComponent,
    ListHallsportComponent,
    EditHallsportComponent,
    ListMemberregisterComponent,
    EditMemberregisterComponent,
    ListMembersportComponent,
    EditMembersportComponent,
    EditProgramsportComponent,
    ListProgramsportComponent,
    ListSelectroleComponent,
    EditSelectroleComponent,
    EditServicessportComponent,
    ListServicessportComponent,
    ListSettingclubsportComponent,
    EditStettingComponent,
   // AppHeaderComponent,
    ConfirmationDialogComponent,
    ReportEventsportComponent,
    ReportFieldSportComponent,
    ReporthallsportComponent,
    ReportMemberRegisterComponent,
    ReportMemberSportComponent,
    ReportMemberProgramSportComponent,
    ReportServicesComponent,
    NotFoundComponent,
    MyCustomMemberPipe,
    ShortNumberPipe,
    GetReportsComponent,
  

  ],
  imports: [

    BrowserModule,
    CommonModule,
      RouterModule,
      NgMultiSelectDropDownModule.forRoot(),
// HeadersModule,
    HttpClientModule,

    FormsModule,
  //  ShortNumberPipe,
  //  DataTablesModule,
    NgSelectModule,
    ReactiveFormsModule,

    AppRoutingModule,

    MatSliderModule,
    MatAutocompleteModule,
    MatButtonModule,
    NgPersianDatepickerModule,
    MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule
    , MatDialogModule ,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
   
    BrowserAnimationsModule

  ],
  exports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule],
  // providers: [
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi: true
  // ],
  // providers: [
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi: true
  //  }
  // ],
  providers: [
  
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],

  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
 // entryComponents: [EditEventsportComponent]
})
export class AppModule { }

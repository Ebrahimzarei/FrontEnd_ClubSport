import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
 
import { AppHeaderComponent } from '../dashoard/app-header/app-header.component';

import { EventSportComponent } from '../dashoard/event-sport/event-sport.component';
import { EditEventsportComponent } from '../dashoard/event-sport/edit-eventsport/edit-eventsport.component';
import { HallSportComponent } from '../dashoard/hall-sport/hall-sport.component';
import { MemberSportComponent } from '../dashoard/member-sport/member-sport.component';
import { ProgramSportComponent } from '../dashoard/program-sport/program-sport.component';
import { SelectRoleComponent } from '../dashoard/select-role/select-role.component';
import { ServicesSportComponent } from '../dashoard/services-sport/services-sport.component';
import { SettingClubSportComponent } from '../dashoard/setting-club-sport/setting-club-sport.component';
import { MemberRegisterComponent} from '../dashoard/member-register/member-register.component';
import { FieldSportComponent } from '../dashoard/field-sport/field-sport.component';

import { ReportEventsportComponent } from '../dashoard/event-sport/report-eventsport/report-eventsport.component';
import { ReportFieldSportComponent } from '../dashoard/field-sport/report-field-sport/report-field-sport.component';
import { ReporthallsportComponent } from '../dashoard/hall-sport/reporthallsport/reporthallsport.component';
import { ReportMemberRegisterComponent } from '../dashoard/member-register/report-member-register/report-member-register.component';
import { ReportMemberSportComponent } from '../dashoard/member-sport/report-member-sport/report-member-sport.component';
import { ReportMemberProgramSportComponent } from '../dashoard/program-sport/report-member-program-sport/report-member-program-sport.component';
import { ReportServicesComponent } from '../dashoard/Services-sport/report-services/report-services.component';
import { LoginComponent } from '../login/login.component';
// const routes: Routes = [

//     // { path: 'header', component: AppHeaderComponent}] },
//    { path: 'header', component: AppHeaderComponent, children: [
//   { path: 'EventSport', component: EventSportComponent},

//   { path: 'FieldSport', component: FieldSportComponent },
//   { path: 'HallSport', component: HallSportComponent },
//   { path: 'MemberRegister', component: MemberRegisterComponent },
//   { path: 'MemberSport', component: MemberSportComponent },
//   { path: 'ProgramSport', component: ProgramSportComponent },
//   { path: 'SelectRole', component: SelectRoleComponent },
//   { path: 'ServicesSport', component: ServicesSportComponent },
//    ]]







 // ] },
const routes: Routes = [
  { path: '/header', component: AppHeaderComponent},

// {path: '', pathMatch: 'full', component: AppHeaderComponent}
//   { path: 'header', component: AppHeaderComponent , children: [
//     {path: 'EventSport', component: EventSportComponent},
//     { path: 'FieldSport', component: FieldSportComponent },
//     { path: 'HallSport', component: HallSportComponent },
//     { path: 'MemberRegister', component: MemberRegisterComponent },
//     { path: 'MemberSport', component: MemberSportComponent },
//     { path: 'ProgramSport', component: ProgramSportComponent },
//     { path: 'SelectRole', component: SelectRoleComponent },
//     { path: 'ServicesSport', component: ServicesSportComponent },



//  ]
// },



];

@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
RouterModule.forChild([
    { path: '', component: AppHeaderComponent,  children: [
    { path: 'EventSport', component: EventSportComponent},
    { path: 'FieldSport', component: FieldSportComponent },
    { path: 'HallSport', component: HallSportComponent },
    { path: 'MemberRegister', component: MemberRegisterComponent },
    { path: 'MemberSport', component: MemberSportComponent },
    { path: 'ProgramSport', component: ProgramSportComponent },
    { path: 'SelectRole', component: SelectRoleComponent },
    { path: 'ServicesSport', component: ServicesSportComponent },

      ]}
    ]),
    // exports: [RouterModule],
    CommonModule,
    // RouterModule,
//    RouterModule.forRoot(routes , { enableTracing: true, preloadingStrategy: PreloadAllModules } ),
  ]

})
export class HeadersModule { }

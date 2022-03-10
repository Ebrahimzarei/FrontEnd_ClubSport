import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
 
import { EventSportComponent } from './dashoard/event-sport/event-sport.component';
import { EditEventsportComponent } from './dashoard/event-sport/edit-eventsport/edit-eventsport.component';
import { HallSportComponent } from './dashoard/hall-sport/hall-sport.component';
import { MemberSportComponent } from './dashoard/member-sport/member-sport.component';
import { ProgramSportComponent } from './dashoard/program-sport/program-sport.component';
import { SelectRoleComponent } from './dashoard/select-role/select-role.component';
import { ServicesSportComponent } from './dashoard/services-sport/services-sport.component';
import { SettingClubSportComponent } from './dashoard/setting-club-sport/setting-club-sport.component';
import { MemberRegisterComponent} from '../app/dashoard/member-register/member-register.component';
import { FieldSportComponent } from './dashoard/field-sport/field-sport.component';

import { ReportEventsportComponent } from './dashoard/event-sport/report-eventsport/report-eventsport.component';
import { ReportFieldSportComponent } from './dashoard/field-sport/report-field-sport/report-field-sport.component';
import { ReporthallsportComponent } from './dashoard/hall-sport/reporthallsport/reporthallsport.component';
import { ReportMemberRegisterComponent } from './dashoard/member-register/report-member-register/report-member-register.component';
import { ReportMemberSportComponent } from './dashoard/member-sport/report-member-sport/report-member-sport.component';
import { ReportMemberProgramSportComponent } from './dashoard/program-sport/report-member-program-sport/report-member-program-sport.component';
import { ReportServicesComponent } from './dashoard/Services-sport/report-services/report-services.component';
import {AuthGuard} from './Services/auth.guard';
import { NotFoundComponent } from './dashoard/not-found-component/not-found-componen';
import { GetReportsComponent } from './get-reports/get-reports.component';

const newLocal = 'DashboardModule';
// const routes: Routes = [];
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
 { path: 'login', component: LoginComponent },
  // { path: 'login', component: LoginComponent , children: [
  {
 path: 'header',
 // loadChildren: '/app/module/headers.module#HeadersModule',
  loadChildren: () => import('../app/module/headers.module') .then(mod => mod.HeadersModule)
},


    // { path: 'header', component: AppHeaderComponent}] },
//    { path: 'headervvvv', component: AppHeaderComponent, children: [
//     { path: 'EventSportvvvv', component: EventSportComponent},

//   { path: 'FieldSportvvvv', component: FieldSportComponent },
//   { path: 'HallSportvvvv', component: HallSportComponent },
//   { path: 'MemberRegistervvvv', component: MemberRegisterComponent },
//   { path: 'MemberSportvvvv', component: MemberSportComponent },
//   { path: 'ProgramSportvvv', component: ProgramSportComponent },
//   { path: 'SelectRolevvv', component: SelectRoleComponent },
//   { path: 'ServicesSportvvv', component: ServicesSportComponent },







 // ] },
 {path: 'GetReports', component: GetReportsComponent, canActivate: [AuthGuard]},
 {path: 'ReportEventSport', component: ReportEventsportComponent, canActivate: [AuthGuard]},
 {path: 'ReportField', component: ReportFieldSportComponent, canActivate: [AuthGuard]},
 {path: 'ReportHall', component: ReporthallsportComponent , canActivate: [AuthGuard]},
 {path: 'ReportMemberRegister', component: ReportMemberRegisterComponent , canActivate: [AuthGuard]},
 {path: 'ReportMemberSport', component: ReportMemberSportComponent , canActivate: [AuthGuard]},
 {path: 'ReportProgram', component: ReportMemberProgramSportComponent , canActivate: [AuthGuard]},
 {path: 'ReportService', component: ReportServicesComponent , canActivate: [AuthGuard]},
 {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: PreloadAllModules , useHash: true} )],

 // imports: [RouterModule.forChild(routes , { enableTracing: true, preloadingStrategy: PreloadAllModules } )]

  exports: [RouterModule]
})
export class AppRoutingModule { }

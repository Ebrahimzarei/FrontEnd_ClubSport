import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
 
import { EventSportServicesService } from '../../Services/event-sport.services.service';
import { HallSportServicesService } from '../../Services/hall-sport-services.service';
import { MemberSportServicesService } from '../../Services/member-sport-services.service';
import { ProgramSportServicesService } from '../../Services/program-sport-services.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit,AfterViewInit {
UserName:string;
Role:string;
PhotoBase64:string;
Image;
CountHall:number;
CountMemberSport:number;
CountProgramSport:number;
CountEventSport:number;
 
  constructor(private sanitizer:DomSanitizer ,
    private OnMemberSport: MemberSportServicesService,
    private OnProgramSport: ProgramSportServicesService,
    private OnEventSport: EventSportServicesService,
    private OnHallServices: HallSportServicesService) {

  }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.PhotoBase64);
}
getCount(){

 this.OnHallServices.ReciveHallSport().subscribe(data=>{
  this.CountHall=data.length;
 })
 this.OnMemberSport.ReciveMemberSport().subscribe(data=>{
  this.CountMemberSport=data.length;
 })
 this.OnProgramSport.ReciveProgramSport().subscribe(data=>{
  this.CountEventSport=data.length;
 })
 this.OnEventSport.ReciveEventSport().subscribe(data=>{
  this.CountProgramSport=data.length;
 })


}
  ngOnInit(): void {
 // window.location.reload();
 
 this.getCount();
 this.UserName= JSON.parse(localStorage.getItem('currentusername'));
 this.Role=JSON.parse(localStorage.getItem('currentrole'));
 this.PhotoBase64=localStorage.getItem('currentphoto');
 
//alert(this.PhotoBase64);
//this.PhotoBase64='data:image/png;base64,'+image;
 
 

  }
  // tslint:disable-next-line: typedef
  ngAfterViewInit(){
 
  }
  // tslint:disable-next-line: typedef
  refresh() {
   // location.reload();

    }

 

}


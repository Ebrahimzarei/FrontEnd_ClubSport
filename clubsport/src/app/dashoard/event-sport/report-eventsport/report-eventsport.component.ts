import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';
import { EventSport } from 'src/app/Shared/Models/EventSport';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { RoleAccess } from 'src/app/Shared/Models/RoleAccess';
import { AuthEventSport } from '../../../Shared/Interface/auth-event-sport';

declare var Stimulsoft: any;
@Component({
  selector: 'app-report-eventsport',
  templateUrl: './report-eventsport.component.html',
  styleUrls: ['./report-eventsport.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportEventsportComponent implements OnInit {

  public EventList: EventSport[] = [];
  public ErrorMessage;
  public dataSet ;
  constructor(public OnServiceReport: EventSportServicesService ) {

   }

  ngOnInit(): void {
   this.getReport();
  }
  getReport() {

    let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

    var report = new Stimulsoft.Report.StiReport();
   // report.loadFile('./src/reports/EventSportReport.mrt');
    report.loadFile("./assets/reports/EventSportReport.mrt")

    this.OnServiceReport.ReciveEventSport()
    .subscribe(
    data=>{
      var ds ={ "EventSport": [
        { "Id": 0},
        { "NameEvent": ""},
        { "EventResult": ""},
        { "RefeRee": ""},
        { "FromDate": ""},
        { "ToDate": ""},
     

      
       
      ]};
   
    // ds.EventSport=data;

    let x:AuthEventSport[]=[ ];
    
    x=data;
    // x.map(item=>{
    //   item
    // });
  //  ds.EventSport=x;
     console.log("x",x);
  data.forEach(element1 => {
    ds.EventSport.forEach(element2 => {
      element2.EventResult=element1.EventResult,
      element2.NameEvent=element1.NameEvent,
      element2.FromDate=element1.FromDate,
      element2.ToDate=element1.ToDate,
      element2.RefeRee=element1.RefeRee,
      element2.Id=element1.Id
    });
  
  });
 
      report.regData("EventSport", "EventSport", ds);
      viewer.report = report;
      viewer.renderHtml("viewerContent");
    },
       // data => this.EventList = data,
        error => this.ErrorMessage = error);
 

    console.log(this.ErrorMessage);






  }


}

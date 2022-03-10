import { Component, OnInit } from '@angular/core';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
declare var Stimulsoft: any;
@Component({
  selector: 'app-reporthallsport',
  templateUrl: './reporthallsport.component.html',
  styleUrls: ['./reporthallsport.component.css']
})
export class ReporthallsportComponent implements OnInit {
  public HallList: HallSport[] = [];
  public ErrorMessage;
  public dataSet ;
  constructor(private OnServiceReport: HallSportServicesService) { }

  ngOnInit(): void {
this.getReport();
  }
  getReport(): void {

   
    //report.loadFile('./src/reports/HallSportReport.mrt');

    this.OnServiceReport.ReciveHallSport()
    .subscribe(data =>
      {
        let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
        var report = new Stimulsoft.Report.StiReport();
        report.loadFile('./assets/reports/HallSportReport.mrt');
        var ds ={ "HallSport": [
          { "Name": ""},
         
        ]};
     
        ds.HallSport=data;
        report.regData("HallSport", "HallSport", ds);
        viewer.report = report;
        viewer.renderHtml("viewerContent");
      },
      //  data => this.HallList = data,
        error => this.ErrorMessage = error);
 
  }

}

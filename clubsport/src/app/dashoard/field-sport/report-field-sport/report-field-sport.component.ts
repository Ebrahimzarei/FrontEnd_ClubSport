import { Component, OnInit } from '@angular/core';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
declare var Stimulsoft: any;
@Component({
  selector: 'app-report-field-sport',
  templateUrl: './report-field-sport.component.html',
  styleUrls: ['./report-field-sport.component.css']
})
export class ReportFieldSportComponent implements OnInit {

  public FieldList: FieldSport[] = [];
  public ErrorMessage;
  public dataSet ;
  constructor(private OnServiceReport: FieldSportServicesService) { }

  ngOnInit(): void {
    this.getReport();
  }
  // tslint:disable-next-line: typedef
  getReport() {

    let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

    var report = new Stimulsoft.Report.StiReport();
    // report.loadFile('./src/reports/FieldSportReport.mrt');
    // report.loadFile("assets/reports/billinglistreport.mrt");
    report.loadFile("assets/reports/FieldSportReport.mrt")

    this.OnServiceReport.ReciveFieldSport()
    .subscribe(
     //   data => this.FieldList = data,
        error => this.ErrorMessage = error);
    if(this.FieldList.length >= 1){
          this.dataSet = new Stimulsoft.System.Data.DataSet('FieldSport');
          this. dataSet.readJson(JSON.stringify(this.FieldList));
          report.regData(this.dataSet.dataSetName, '', this. dataSet);
          report.render();
          viewer.report = report;
          viewer.renderHtml('Viewer');
        }
    console.log(this.ErrorMessage);






  }


}

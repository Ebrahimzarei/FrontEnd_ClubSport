import { Component, OnInit } from '@angular/core';
import { ServicesSportServiceService } from 'src/app/Services/services-sport-service.service';
import { ServicesSport } from 'src/app/Shared/Models/ServicesSport';
declare var Stimulsoft: any;
@Component({
  selector: 'app-report-services',
  templateUrl: './report-services.component.html',
  styleUrls: ['./report-services.component.css']
})
export class ReportServicesComponent implements OnInit {
  public ServicesList: ServicesSport[] = [];
  public ErrorMessage;
  public dataSet ;
  constructor(private OnServiceReport: ServicesSportServiceService) { }

  ngOnInit(): void {
    this.getReport();
  }
  getReport(): void {

    let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

    var report = new Stimulsoft.Report.StiReport();
    report.loadFile('./src/reports/ServicesSportReport.mrt');

    this.OnServiceReport.ReciveServicesSport()
    .subscribe(
        //data => this.ServicesList = data,
        error => this.ErrorMessage = error);
    if (this.ServicesList.length >= 1){
          this.dataSet = new Stimulsoft.System.Data.DataSet('ServicesSport');
          this. dataSet.readJson(JSON.stringify(this.ServicesList));
          report.regData(this.dataSet.dataSetName, '', this. dataSet);
          report.render();
          viewer.report = report;
          viewer.renderHtml('Viewer');
        }
    console.log(this.ErrorMessage);






  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { AuthFieldSport } from '../Shared/Interface/auth-field-sport';
declare var Stimulsoft: any;
@Component({
  selector: 'app-get-reports',
 templateUrl: './get-reports.component.html',
  styleUrls: ['./get-reports.component.css']
})
export class GetReportsComponent implements OnInit {
  public FieldList: AuthFieldSport[] = [];
  public ErrorMessage;
  public dataSet ;

  constructor(private OnServiceReport: FieldSportServicesService ,private http: HttpClient) { }

   ngOnInit() {

   this. getReport();
  }
  getReport() {
    this.OnServiceReport.ReciveFieldSport().subscribe(data => 
      {
  
        let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
        var report = new Stimulsoft.Report.StiReport();
        report.loadFile('./assets/reports/FieldSportReport.mrt');
        var ds ={ "FieldSport": [
          { "NameField": ""},
          { "NameField": "" }
        ]};
     
        ds.FieldSport=data;
        report.regData("FieldSport", "FieldSport", ds);
        viewer.report = report;
        viewer.renderHtml("viewerContent");
  
    });
  }
}

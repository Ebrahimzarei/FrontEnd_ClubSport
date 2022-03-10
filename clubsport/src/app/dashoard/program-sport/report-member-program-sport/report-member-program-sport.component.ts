import { Component, OnInit } from '@angular/core';
import { ProgramSport } from 'src/app/Shared/Models/ProgramSport';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
declare var Stimulsoft: any;
@Component({
  selector: 'app-report-member-program-sport',
  templateUrl: './report-member-program-sport.component.html',
  styleUrls: ['./report-member-program-sport.component.css']
})
export class ReportMemberProgramSportComponent implements OnInit {

  public ProgramSportList: ProgramSport[] = [];
  public ErrorMessage;
  public dataSet ;
  constructor(private OnServiceReport: ProgramSportServicesService) { }

  ngOnInit(): void {
  this.getReport();
  }
  getReport(): void {

 
  //  report.loadFile('./src/reports/ProgramSportReport.mrt');

    this.OnServiceReport.ReciveProgramSport()
    .subscribe(data=>{
      let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
      var report = new Stimulsoft.Report.StiReport();
      report.loadFile('./assets/reports/ProgramSportReport.mrt');
      var ds ={ "ProgramSport": [
        { "Id": Number},

        { "NameProgram": ""},
        { "FromDate": "" },
        { "ToDate": "" },
        { "DetailsSport": "" },
        { "AbsenceCost": 0 }


        
      ]};
   
     ds.ProgramSport.pop();
 data.forEach(element1 => {
  ds.ProgramSport.forEach(element2 => {
   
    element2.NameProgram=element1.NameProgram,
    element2.FromDate=element1.FromDate,
    element2.ToDate=element1.ToDate,
    element2.DetailsSport=element1.DetailsSport,
    element2.AbsenceCost=element1.AbsenceCost
   }
 
   );
  //  ds.ProgramSport.pop();
  //  ds.ProgramSport.pop();
  //  ds.ProgramSport.pop();
  //  ds.ProgramSport.pop();


 });
      
      report.regData("ProgramSport", "ProgramSport", ds);
      console.log("ds",ds)
      viewer.report = report;
      viewer.renderHtml("viewerContent");
    },

        error => this.ErrorMessage = error);
  






  }

}

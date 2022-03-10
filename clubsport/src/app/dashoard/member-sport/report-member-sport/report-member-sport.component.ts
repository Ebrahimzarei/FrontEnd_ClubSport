import { Component, OnInit } from '@angular/core';
import { MemberSport, MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';
import { AuthMemberSport } from 'src/app/Shared/Interface/auth-member-sport';
declare var Stimulsoft: any;
@Component({
  selector: 'app-report-member-sport',
  templateUrl: './report-member-sport.component.html',
  styleUrls: ['./report-member-sport.component.css']
})
export class ReportMemberSportComponent implements OnInit {


  public MemberSportList: MemberSport[] = [];
  public ErrorMessage;
  public dataSet ;
  constructor(private OnServiceReport: MemberSportServicesService) { }

  ngOnInit(): void {
    this.getReport();
  }
  getReport(): void {

    

    this.OnServiceReport.ReciveMemberSport().subscribe(data => 
      {
  
        let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
        var report = new Stimulsoft.Report.StiReport();
        report.loadFile('./assets/reports/MemberSportReport.mrt');
        var ds ={ "MemberSport": [
          { "Id": 11},
          { "Ncode": 55 },
          { "Photo": "" },
          { "FullName": "" }
        ]};
        var dss:any={
          "MemberSport":[
{"FullName":""},
{"d":1},
{"Ncode":555},
{"Photo":""},
{"HallSportRef":1}]
        } ;
        data.forEach( element1 => {
         ds.MemberSport.forEach(element2 => {
      element2.FullName=element1.FullName,
      element2.Ncode=element1.Ncode,
      element2.Photo=element1.Photo,
      element2.Id=element1.Id




        });
        });
console.log('ds',ds);
     
       // ds.MemberSport=data;
        report.regData("MemberSport", "MemberSport", ds);
        viewer.report = report;
        viewer.renderHtml("viewerContent");
  
    });

 






  }

}

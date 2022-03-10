import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Shared/Models/Member';
import { MemberServicesService } from 'src/app/Services/member-services.service';
import { AuthMember } from 'src/app/Shared/Interface/auth-member';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
// import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

declare var Stimulsoft: any;

@Component({
  selector: 'app-report-member-register',
  templateUrl: './report-member-register.component.html',
  styleUrls: ['./report-member-register.component.css']
})
export class ReportMemberRegisterComponent implements OnInit {

 // public MemberList: Member[] = [];
  public ErrorMessage;
  public dataSet ;
  subscription: Subscription;
  public  MemberRegisterList: AuthMember[] = [];

  constructor(private OnServiceReport: MemberServicesService,private route: ActivatedRoute,
          
  private router: Router) { }

  ngOnInit(): void {

this.getReport();
    
  

  }







  getReport(): void {

    this.OnServiceReport.ReciveMember()
  .subscribe((data:any[])=>{
    let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
    var report = new Stimulsoft.Report.StiReport();
    report.loadFile('assets/reports/MemberReport.mrt');
    var ds ={ "Member": [
      { "Id": 1},
      { "FullName": "" },
      { "Natinalcode": 1 },
      { "FatherName": "" },
      { "UserName": "" },
      { "Password": "" },
      { "Photo": "" },
      
    ]};
 
    ds.Member=data;
    report.regData("Member", "Member", ds);
    viewer.report = report;
    viewer.renderHtml("viewerContent");
      //console.log("EBRAHIM2",this.M_Sport);
    });



    let viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

    var report = new Stimulsoft.Report.StiReport();
  
   report.loadFile('assets/reports/MemberReport.mrt'); 
  //report.loadFile('src/MemberReport.mrt'); 

    if (this.MemberRegisterList.length >= 1){
      this.dataSet = new Stimulsoft.System.Data.DataSet('Member');
      this. dataSet.readJson(JSON.stringify(this.MemberRegisterList));
      report.regData(this.dataSet.dataSetName, '', this. dataSet);
      report.render();
      viewer.report = report;
      viewer.renderHtml('Viewer');
    }
console.log(this.ErrorMessage);

  }
  Back(){
    this.router.navigate(['/MemberRegister'], {relativeTo: this.route});
  }

}

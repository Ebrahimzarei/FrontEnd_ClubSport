import { Component } from '@angular/core';

declare var Stimulsoft: any;
@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',
 // template: '<div class="card-body"><router-outlet></router-outlet></div>',

  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'clubsport';

  getReport() {


   let report = new Stimulsoft.Report.StiReport();
  //  report.loadFile("assets/reports/billinglistreport.mrt");

  }
  // tslint:disable-next-line: typedef
  // getReport() {
  //   // this.options.toolbar.showAboutButton = false;
  //    //this.report.dictionary.databases.clear();
  //    let report = new Stimulsoft.Report.StiReport();
  //    report.loadFile('assets/reports/billinglistreport.mrt');
  //    this.entityDataService
  //      .postData(BillingListReport, this.parms)
  //      .pipe(take(1))
  //      .subscribe((res) => {
  //        const dataSet = new Stimulsoft.System.Data.DataSet("biliing");

  //        // let temp = JSON.stringify(res);
  //        dataSet.readJson(JSON.stringify(res));
  //        // report.dictionary.dataStore.clear();
  //        report.regData(dataSet.dataSetName, "", dataSet);

  //        report.render();
  //        this.viewer.report = report;
  //        this.viewer.renderHtml("Viewer");
  //        this.loading = false;
  //      });
  //  }
}


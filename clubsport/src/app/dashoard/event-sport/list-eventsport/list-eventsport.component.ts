import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EventSport } from 'src/app/Shared/Models/EventSport';
import { EventSportServicesService } from 'src/app/Services/event-sport.services.service';

import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditEventsportComponent } from '../edit-eventsport/edit-eventsport.component';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthEventSport } from 'src/app/Shared/Interface/auth-event-sport';
declare var Stimulsoft: any;
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
 
@Component({
  selector: 'app-list-eventsport',
  templateUrl: './list-eventsport.component.html',
  styleUrls: ['./list-eventsport.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ListEventsportComponent implements OnInit {
  cols: any[];
 
  dataSource;
  public EventList: AuthEventSport[] = [];
public isDone: boolean ;

  // viewer: any = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
  // report: any = new Stimulsoft.Report.StiReport();

  public ErrorMessage;
  constructor( private EventServices: EventSportServicesService,
               private route: ActivatedRoute,
               private router: Router,
               private matDialog: MatDialog) {


                }



    // tslint:disable-next-line: typedef
    ngOnInit() {
    
      this.isDone = true;
      this.EventServices.ReciveEventSport()
      .subscribe(
          data => this.EventList = data,
           error => this.ErrorMessage = error
         );
      if(this.EventList.length >= 1){
        this.dataSource = new MatTableDataSource<AuthEventSport>(this.EventList);
       
            this.isDone = true;
           }
           else{
            this.isDone = false;
           }

      // interval(1000).pipe(
      //   map((x) => {

      //         })
      // );
        }

        onEditEvent(index:number): void
        {
      // console.log(index);
      window.localStorage.removeItem('IdEventsportEdit');

      window.localStorage.setItem('IdEventsportEdit', index.toString());

      // this.router.navigate(['header/EditEventSport']);
      const dialogConfig = new MatDialogConfig();

      this.matDialog.open(EditEventsportComponent, dialogConfig);
      // this.dialog.open(EditEventsportComponent);




        }


        onDeleteEvent(index: number){
          if (confirm('آیا از حذف اطمینان دارید؟')) {
            this.EventServices.DeleteEventSport(index).subscribe(
           //   result => this.EventList  = result,
              error =>  console.log(error),
            );

          }

        }
        // tslint:disable-next-line: typedef
        PrintEventSport()
        {

this.openPDF();

        }
        ReportEventSport(){
      this.router.navigate(['/ReportEventSport'], {relativeTo: this.route});

        }
        public openPDF():void {
          let DATA = document.getElementById('htmlData');
              
          html2canvas(DATA).then(canvas => {
              
              let fileWidth = 208;
              let fileHeight = canvas.height * fileWidth / canvas.width;
              
              const FILEURI = canvas.toDataURL('image/png')
              let PDF = new jsPDF('p', 'mm', 'a4');
              let position = 0;
              PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
              
              PDF.save('EventSport.pdf');
          });     
          }
      }

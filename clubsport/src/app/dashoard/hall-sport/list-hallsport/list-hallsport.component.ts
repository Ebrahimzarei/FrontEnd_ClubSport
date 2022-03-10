import { Component, OnInit } from '@angular/core';
import { HallSport } from 'src/app/Shared/Models/HallSport';
import { HallSportServicesService } from 'src/app/Services/hall-sport-services.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditHallsportComponent } from '../edit-hallsport/edit-hallsport.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHallSport } from 'src/app/Shared/Interface/auth-hall-sport';
import { MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-hallsport',
  templateUrl: './list-hallsport.component.html',
  styleUrls: ['./list-hallsport.component.css']
})
export class ListHallsportComponent implements OnInit {
  public HallSport: AuthHallSport[] = [];
  public HallSportModel: HallSport[] = [];
  public MemberSport: MemberSportOutPut[] = [];
  subscription: Subscription;
  public ErrorMessage: '';
  public isDone: boolean ;
  constructor(private HallService: HallSportServicesService, private matDialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
    ) { }

  ngOnInit() {
    this.subscription = this.HallService.HallSportChanged
    .subscribe(
      (value: HallSport[]) => {
        this.HallSportModel = value;
      }
    );
  
    this.HallService.ReciveHallSport()
    .subscribe(
 
      data => this.HallSport = data,
        // error => this.ErrorMessage = error
         );
    if(this.HallSport.length >= 1){
          this.isDone = true;
         }
         else{
          this.isDone = false;
         }
     
    

  }
  onEditEvent(index: number){
    window.localStorage.removeItem('IdHallsportEdit');

    window.localStorage.setItem('IdHallsportEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();

    this.matDialog.open(EditHallsportComponent, dialogConfig);

    }
    // tslint:disable-next-line: typedef
    OnDeleteHall(index: number)
    {
      if (confirm('آیا از حذف اطمینان دارید؟')) {
        this.HallService.DeleteHallSport(index).subscribe(
         // result => this.HallSport  = result,
          error =>  console.log(error),
        );

      }
    }
    OnReport(){
     this.router.navigate(['/ReportHall'], {relativeTo: this.route});
  //  this.openPDF();
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
          
          PDF.save('سالن ورزشی');
      });     
      }
}

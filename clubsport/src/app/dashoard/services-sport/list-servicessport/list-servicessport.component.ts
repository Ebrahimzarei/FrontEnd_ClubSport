import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditServicessportComponent } from '../edit-servicessport/edit-servicessport.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesSportServiceService } from 'src/app/Services/services-sport-service.service';
import { AuthServicesSport } from 'src/app/Shared/Interface/auth-services-sport';
import { ServicesSport } from 'src/app/Shared/Models/ServicesSport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-list-servicessport',
  templateUrl: './list-servicessport.component.html',
  styleUrls: ['./list-servicessport.component.css']
})
export class ListServicessportComponent implements OnInit {
 

  public AuthServicesSport: AuthServicesSport[] = [];
  public ListServicesSport: ServicesSport[] = [];

  public ErrorMessage: '';
  public isDone: boolean ;
  constructor(private matDialog: MatDialog,
              private route: ActivatedRoute,
              private SerivcesSport: ServicesSportServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.SerivcesSport.ReciveServicesSport().subscribe(
      data => this.AuthServicesSport = data,
      data=>this.ListServicesSport=data,
     // tslint:disable-next-line: no-shadowed-variable
 //  error => this.ErrorMessage = error
    );
    if(this.AuthServicesSport.length >= 1){
      this.isDone = true;
     }
     else{
      this.isDone = false;
     }
  }
  onEditEvent(index: number){
    window.localStorage.removeItem('IdServicessportEdit');

    window.localStorage.setItem('IdServicessportEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="1000px";
    dialogConfig.height="1000px";

    this.matDialog.open(EditServicessportComponent, dialogConfig);

    }
    onDeleteServiceSport (index: number){
      if (confirm('آیا از حذف اطمینان دارید؟')) {
this.SerivcesSport.DeleteServicesSport(index).subscribe(
    // result => this.MemberRegister  = result,
    result =>console.log(result),

     error =>  console.log(error),
  );
        // this..DeleteMember(index).subscribe(
        //   result => this.MemberRegister  = result,
        //   error =>  console.log(error),
      //  );
        }

    }
    OnPrint(){
    //  this.router.navigate(['/ReportService'], {relativeTo: this.route});
    this.openPDF();
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
          
          PDF.save('ServiceSport.pdf');
      });     
      }
}

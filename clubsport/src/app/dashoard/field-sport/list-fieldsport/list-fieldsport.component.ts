import { Component, OnInit } from '@angular/core';
import { FieldSport } from 'src/app/Shared/Models/FieldSport';
import { FieldSportServicesService } from 'src/app/Services/field-sport-services.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditFieldsportComponent } from '../edit-fieldsport/edit-fieldsport.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFieldSport } from 'src/app/Shared/Interface/auth-field-sport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-list-fieldsport',
  templateUrl: './list-fieldsport.component.html',
  styleUrls: ['./list-fieldsport.component.css']
})
export class ListFieldsportComponent implements OnInit {

  public FieldList: AuthFieldSport[] = [];
  public isDone: boolean ;
  public ErrorMessage: '';
  constructor(private FieldService: FieldSportServicesService,  private matDialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
    ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.isDone = true ;
    this.FieldService.ReciveFieldSport()
    .subscribe(
 
      data => this.FieldList = data,
      error => this.ErrorMessage = error
         );
    if(this.FieldList.length >= 1){
          this.isDone = true;
         }
         else{
          this.isDone = false;
         }
  }
// tslint:disable-next-line: typedef
 onEditEvent(index: number){
  window.localStorage.removeItem('IdFieldsportEdit');

  window.localStorage.setItem('IdFieldsportEdit', index.toString());

  // this.router.navigate(['header/EditEventSport']);
  const dialogConfig = new MatDialogConfig();

  this.matDialog.open(EditFieldsportComponent, dialogConfig);

  }
  onDeleteEvent(index: number){
    if (confirm('آیا از حذف اطمینان دارید؟')) {
      this.FieldService.DeleteFieldSport(index).subscribe(
        data => this.FieldList = data,
        error => this.ErrorMessage = error);


    }


  }
  // tslint:disable-next-line: typedef
  OnPrint(){
   // GetReports
   this.router.navigate(['/GetReports'], {relativeTo: this.route});
 //this.openPDF();
   // this.router.navigate(['/ReportField'], {relativeTo: this.route});
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
        
        PDF.save('رشته ورزشی.pdf');
    });     
    }

}

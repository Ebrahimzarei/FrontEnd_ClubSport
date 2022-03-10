import { Component, OnInit } from '@angular/core';
import { ProgramSportServicesService } from 'src/app/Services/program-sport-services.service';
import { ProgramSport } from 'src/app/Shared/Models/ProgramSport';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditProgramsportComponent } from '../edit-programsport/edit-programsport.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProgramSport } from 'src/app/Shared/Interface/auth-program-sport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-list-programsport',
  templateUrl: './list-programsport.component.html',
  styleUrls: ['./list-programsport.component.css']
})
export class ListProgramsportComponent implements OnInit {

  public ProgramSport: AuthProgramSport[] = [];
  public ErrorMessage: '';
  public isDone: boolean ;
  constructor(private ProgramService: ProgramSportServicesService, private matDialog: MatDialog ,
              private route: ActivatedRoute,
              private router: Router,
    ) { }

  ngOnInit(): void {
    this.ProgramService.ReciveProgramSport().subscribe(
      data => this.ProgramSport = data,
     // tslint:disable-next-line: no-shadowed-variable
   error => this.ErrorMessage = error
    );
    if(this.ProgramSport.length >= 1){
      this.isDone = true;
     }
     else{
      this.isDone = false;
     }

  }
  onEditEvent(index: string){
    window.localStorage.removeItem('IdProgramsportEdit');

    window.localStorage.setItem('IdProgramsportEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width='1000px';
    dialogConfig.height='1000px';
    this.matDialog.open(EditProgramsportComponent, dialogConfig);

    }
    onDeleteProgram(index: number){
  


        if (confirm('آیا از حذف اطمینان دارید؟')) {
          this.ProgramService.DeleteProgramSport(index).subscribe(
        result => this.ProgramSport  = result,
            // error =>  console.log(error),
          );
  
          }
          if (this.ProgramSport!==null) {
         //   alert("حذف با موفقیت انجام شد");
          } else {
          //  alert("خطا در حذف");
            
          }

    }
    OnReport(){
     this.router.navigate(['/ReportProgram'], {relativeTo: this.route});
   //   this.openPDF();
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
          
          PDF.save('ProgramSport.pdf');
      });     
      }
}

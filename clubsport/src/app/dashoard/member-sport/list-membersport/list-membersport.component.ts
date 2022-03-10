import { Component, OnInit } from '@angular/core';
import { MemberSportServicesService } from 'src/app/Services/member-sport-services.service';
import { MemberSport, MemberSportOutPut } from 'src/app/Shared/Models/MemberSport';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditMembersportComponent } from '../edit-membersport/edit-membersport.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthMemberSport } from 'src/app/Shared/Interface/auth-member-sport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-list-membersport',
  templateUrl: './list-membersport.component.html',
  styleUrls: ['./list-membersport.component.css']
})
export class ListMembersportComponent implements OnInit {

  public MemberSport: MemberSportOutPut[] = [];
  public ErrorMessage: '';
  public isDone: boolean ;
  constructor(private MemberSportService: MemberSportServicesService, private matDialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
    ) { }

  ngOnInit(): void {
    let items:any[]=[];
    this.MemberSportService.ReciveMemberSport().subscribe((data:any[])=>{
      console.log(data);
      this.MemberSport=data; 

     items=data;
       
      console.log("EbrahimHMemberSport",items);
      //console.log("EBRAHIM2",this.M_Sport);
    });

    console.log("EbrahimHMemberSport",items);

    if(items.length >= 1){
          this.isDone = true;
         }
         else{
          this.isDone = false;
         }
  }
  // tslint:disable-next-line: typedef
  onEditEvent(index: number){
    window.localStorage.removeItem('IdMemberSportEdit');

    window.localStorage.setItem('IdMemberSportEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='1000px';
    dialogConfig.height='1000px';

    this.matDialog.open(EditMembersportComponent, dialogConfig);

    }
    OnDeleteMemberSport(index: number)
    {
  
      let date:MemberSportOutPut[];

        if (confirm('آیا از حذف اطمینان دارید؟')) {
          this.MemberSportService.DeleteMemberSport(index).subscribe(
       result => date  = result,
            error =>  console.log(error),
          );
  
          };
        

    }
   
    OnReport(){
      this.router.navigate(['/ReportMemberSport'], {relativeTo: this.route});
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
          
          PDF.save('MemberSport.pdf');
      });     
      }

}

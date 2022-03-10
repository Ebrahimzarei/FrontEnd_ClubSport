import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/Shared/Models/Member';
import { MemberServicesService } from 'src/app/Services/member-services.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MemberRegisterComponent } from '../member-register.component';
import { EditMemberregisterComponent } from '../edit-memberregister/edit-memberregister.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthMemberSport } from 'src/app/Shared/Interface/auth-member-sport';
import { AuthMember } from 'src/app/Shared/Interface/auth-member';
import { DomSanitizer } from '@angular/platform-browser';
import{ReportMemberRegisterComponent} from'../report-member-register/report-member-register.component';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-list-memberregister',
  templateUrl: './list-memberregister.component.html',
  styleUrls: ['./list-memberregister.component.css']
})
export class ListMemberregisterComponent implements OnInit {
 


  public MemberRegister: Member[] = [];
   public  MemberRegisterList: AuthMember[] = [];
 // public MemberRegisterList: any[] = [];
  public ErrorMessage: '';
  public isDone: boolean ;

  constructor(private MemberServices: MemberServicesService, private matDialog: MatDialog,
              private route: ActivatedRoute,
          
              private router: Router,
    ) { }

  
  ngOnInit(): void {
   // this.MemberRegisterList=[];
    let items:any[]=[];
  
        this.MemberServices.ReciveMember().subscribe((data:any[])=>{
          console.log(data);
          this.MemberRegisterList=data;
        
           items=data;
           
          console.log("EbrahimHMember",this.MemberRegisterList);
          //console.log("EBRAHIM2",this.M_Sport);
        });
   
       
     if(this.MemberRegisterList.length >= 1){
           this.isDone = true;
         }
          else{
         this.isDone = false;
         }

  }
  onEditEvent(index: number){
    window.localStorage.removeItem('IdMemberRegEdit');

    window.localStorage.setItem('IdMemberRegEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width='1000px';
    dialogConfig.height='1000px';
    this.matDialog.open(EditMemberregisterComponent,dialogConfig);

    
    // this.matDialog.open(EditMemberregisterComponent,{height:'100px',width:'100px'});
  


    }
    onDeleteMemberReg(index: number){
      if (confirm('آیا از حذف اطمینان دارید؟')) {
        this.MemberServices.DeleteMember(index).subscribe(
      result => this.MemberRegisterList  = result,
          // error =>  console.log(error),
        );

        }
        if (this.MemberRegisterList!==null) {
       //   alert("حذف با موفقیت انجام شد");
        } else {
        //  alert("خطا در حذف");
          
        }
    }
    OnPrint(){
    
 
      this.openPDF();
     
    }
    CreateReport() {
   this.router.navigate(['/ReportMemberRegister'], {relativeTo: this.route});
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
          
          PDF.save('کاربر.pdf');
      });     
      }

}

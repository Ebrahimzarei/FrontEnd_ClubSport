import { Component, OnInit } from '@angular/core';
import { RoleAccess } from 'src/app/Shared/Models/RoleAccess';
import { RoleAccessServicesService } from 'src/app/Services/role-access-services.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditSelectroleComponent } from '../edit-selectrole/edit-selectrole.component';

@Component({
  selector: 'app-list-selectrole',
  templateUrl: './list-selectrole.component.html',
  styleUrls: ['./list-selectrole.component.css']
})
export class ListSelectroleComponent implements OnInit {
  public SelectRole: RoleAccess[] = [];
  public ErrorMessage: '';
  public isDone: boolean ;
  constructor(private SelectRoleServices: RoleAccessServicesService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.SelectRoleServices.ReciveRoleAccess().subscribe(
    //  data => this.SelectRole = data,
    // tslint:disable-next-line: no-shadowed-variable
  //  error => this.ErrorMessage = error,
    );
    if(this.SelectRole.length >= 1){
      this.isDone = false;
     }
     else{
      this.isDone = true;
     }
  }
  onEditEvent(index: string){
    window.localStorage.removeItem('IdSelectRoleEdit');

    window.localStorage.setItem('IdSelectRoleEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();


    this.matDialog.open(EditSelectroleComponent, dialogConfig);

    }
    onDeleteSelectRole(index : number){
      if (confirm('آیا از حذف اطمینان دارید؟')) {
        this.SelectRoleServices.DeleteRoleAccess(index).subscribe(
        //  result => this.SelectRole  = result,
          error =>  console.log(error),
        );
        }
    }

}

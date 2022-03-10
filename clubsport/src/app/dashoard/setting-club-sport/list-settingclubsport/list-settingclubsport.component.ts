import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditServicessportComponent } from '../../services-sport/edit-servicessport/edit-servicessport.component';

import { EditStettingComponent } from 'src/app/dashoard/setting-club-sport/edit-stetting/edit-stetting.component';
@Component({
  selector: 'app-list-settingclubsport',
  templateUrl: './list-settingclubsport.component.html',
  styleUrls: ['./list-settingclubsport.component.css']
})
export class ListSettingclubsportComponent implements OnInit {
  public isDone: boolean ;
  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    // if(this.HallSport.length >= 1){
    //   this.isDone = false;
    //  }
    //  else{
    //   this.isDone = true;
    //  }
  }
  onEditEvent(index: string){
    window.localStorage.removeItem('IdSettingSportEdit');

    window.localStorage.setItem('IdSettingSportEdit', index.toString());

    // this.router.navigate(['header/EditEventSport']);
    const dialogConfig = new MatDialogConfig();


    this.matDialog.open(EditStettingComponent, dialogConfig);

    }
    onDeleteSetting(index: string){

    }

}

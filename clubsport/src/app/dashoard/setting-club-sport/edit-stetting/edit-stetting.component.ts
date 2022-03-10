import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-stetting',
  templateUrl: './edit-stetting.component.html',
  styleUrls: ['./edit-stetting.component.css']
})
export class EditStettingComponent implements OnInit {
  dateObject: any;
  public options: string[] = ['Test1', 'Test', 'est'];
  public  ErrorMessage: string;
 // private ServicesSport: Setting  ;
//  ReciveSErvicesSport: FormGroup ;
  imageSrc: string;
  constructor(public dialogRef: MatDialogRef<EditStettingComponent>,
              private dialog:  MatDialog) { }

  ngOnInit(): void {
  }

}

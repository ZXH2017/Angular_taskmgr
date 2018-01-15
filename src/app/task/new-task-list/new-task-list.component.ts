import { Component, OnInit, Inject ,ChangeDetectionStrategy} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
  
})
export class NewTaskListComponent implements OnInit {

  title = '';

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewTaskListComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
  }

  onClick() {
    this.dialogRef.close(this.title);
  }

}

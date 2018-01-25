import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {
  lists: any[];
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<CopyTaskComponent>) { }
  //MdDialogRef方便以后关闭dialog的时候往调用者中传递数据
  ngOnInit() {
    this.lists = this.data.lists;
  }

  onClick() {

  }
}

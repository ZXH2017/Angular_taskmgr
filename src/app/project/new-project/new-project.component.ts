import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewProjectComponent>,
    private oc: OverlayContainer) { }

  ngOnInit() {
    console.log(JSON.stringify(this.data));
    this.oc.themeClass = this.data.dark ? 'myapp-dark-theme' : null;
  }
  onClick() {
    this.dialogRef.close("I received your message");
  }
}

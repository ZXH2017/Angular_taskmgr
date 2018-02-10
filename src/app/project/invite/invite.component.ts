import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { User } from '../../domain/user.model';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InviteComponent implements OnInit {

  // items = [
  //   { id: 1, name: 'zhangsan' },
  //   { id: 2, name: 'lisi' },
  //   { id: 3, name: 'wangwu' }
  // ]

  members: User[] = [];
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<InviteComponent>
  ) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }

  // displayUser(user: { id: string; name: string }) {
  //   return user ? user.name : '';
  // }
  onSubmit(ev: Event, { valid, value }) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}

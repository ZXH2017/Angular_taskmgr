import { Component, OnInit ,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
  
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

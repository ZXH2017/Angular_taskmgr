import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatat: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务二：完成老板布置的ppt作业',
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务三:项目代码评审',
          owner: {
            id: 1,
            name: '王五',
            avatars: 'avatars:svg-13'
          },
          dueDate: new Date(),
        }, {
          id: 2,
          desc: '任务四：指定项目计划',
          owner: {
            id: 1,
            name: '李四',
            avatars: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }
      ]
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}

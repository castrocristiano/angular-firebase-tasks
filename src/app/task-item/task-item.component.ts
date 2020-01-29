import { Task } from './../models/task.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() selectTask = new EventEmitter<Task>();
  @Output() performTask = new EventEmitter<Task>();

  executeAction(action: string): void {
    /*
      if (action === 'select') {
        this.selectTask.emit(this.task);
      } else if ...
    */
      this[action].emit(this.task);
  }

}

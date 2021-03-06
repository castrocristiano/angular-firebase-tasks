import { TaskDialogComponent } from './../task-dialog/task-dialog.component';
import { TaskService } from './../task.service';
import { Task } from './../models/task.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  loading = true;
  selectedTask: Task;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.tasks$ = this.taskService.tasks.valueChanges();

    this.tasks$
      .pipe(take(1))
      .subscribe(() => this.loading = false);
  }

  onPerformTask(task: Task) {
    task.done = ! task.done;
    this.taskService.update(task);
  }

  showDialog(task?: Task): void {
    const config: MatDialogConfig<any> = (task) ? {data: {task}} : null;
    this.dialog.open(TaskDialogComponent, config);
  }

  onDelete(task: Task) {
    this.taskService.delete(task);
  }
}

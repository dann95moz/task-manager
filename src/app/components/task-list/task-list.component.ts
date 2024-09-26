import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { selectAllTasks, selectCompletedTasks, selectPendingTasks } from 'src/app/store/task.selectors';
import { completeTask, removePersonFromTask, removeSkillFromPerson } from 'src/app/store/task.actions';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private store: Store) {
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

  ngOnInit() {
    this.updateFilter();
  }

  updateFilter() {
    switch (this.filter) {
      case 'completed':
        this.tasks$ = this.store.pipe(select(selectCompletedTasks));
        break;
      case 'pending':
        this.tasks$ = this.store.pipe(select(selectPendingTasks));
        break;
      default:
        this.tasks$ = this.store.pipe(select(selectAllTasks));
    }
  }

  completeTask(id: number) {
    this.store.dispatch(completeTask({ id }));
  }

  removePerson(taskId: number, personId: number) {
    this.store.dispatch(removePersonFromTask({ taskId, personId }));
  }

  removeSkill(taskId: number, personId: number, skill: string) {
    this.store.dispatch(removeSkillFromPerson({ taskId, personId, skill }));
  }
}

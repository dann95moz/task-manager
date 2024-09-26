import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import { addTask, completeTask, markTaskAsPending } from '../store/task.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private store: Store) { }
  addTask(task: Task): Observable<void> {
    return new Observable(observer => {
      this.store.dispatch(addTask({ task }));
      observer.next();
      observer.complete();
    });
  }
  completeTask(id: number) {
    this.store.dispatch(completeTask({ id }));
  }

  markTaskAsPending(id: number) {
    this.store.dispatch(markTaskAsPending({ id }));
  }
}

import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import { addTask } from '../store/task.actions';
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
}

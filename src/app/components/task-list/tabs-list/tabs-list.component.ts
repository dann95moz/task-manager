//angular imports
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// interfaces
import { Task } from 'src/app/interfaces/task.interface';

//angular material Modules
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

//services
import { TaskService } from 'src/app/services/task-service.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllTasks, selectCompletedTasks, selectPendingTasks } from 'src/app/store/task.selectors';

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule,
    MatChipsModule,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './tabs-list.component.html',
  styleUrls: ['./tabs-list.component.scss']
})
export class TabsListComponent implements OnChanges{

  @Input() tasks: Task[] = []
  @Input() status: 'all' | 'pending' | 'completed' = 'all'
  tasks$: Observable<Task[]> = new Observable<Task[]>;
 

  constructor( private taskService: TaskService, private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.setTasksObservable();
    }
  }
  
  private setTasksObservable() {
    switch (this.status) {
      case 'pending':
        this.tasks$ = this.store.pipe(select(selectPendingTasks));
        break;
      case 'completed':
        this.tasks$ = this.store.pipe(select(selectCompletedTasks));
        break;
      default:
        this.tasks$ = this.store.pipe(select(selectAllTasks));
        break;
    }
  }

 
  completeTask(id: number) {
    this.taskService.completeTask(id);
  }

  markTaskAsPending(id: number) {
    this.taskService.markTaskAsPending(id);
  }
}

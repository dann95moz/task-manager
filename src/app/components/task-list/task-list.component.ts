import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

//interfaces
import { Task } from 'src/app/interfaces/task.interface';

//ngRX imports
import { Store, select } from '@ngrx/store';
import { selectAllTasks} from 'src/app/store/task.selectors';


//Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsListComponent } from './tabs-list/tabs-list.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  //material modules
  MatButtonModule,
  MatTabsModule,
  //components
  TabsListComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private store: Store) {
    this.tasks$ = this.store.pipe(select(selectAllTasks));
  }

  
  }







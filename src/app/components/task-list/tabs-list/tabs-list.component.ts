import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/interfaces/task.interface';
import {  Store } from '@ngrx/store';
import { completeTask, markTaskAsPending } from 'src/app/store/task.actions';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

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

  @Input() tasks: Task[] | null= []
  @Input() status: string ='all'
  filteredTasks: Task[] |null= [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] || changes['status']) {
      this.filterTasks();
    }
  }
  filterTasks() {
    if (this.tasks) {
      
      if (this.status === 'all') {
        this.filteredTasks = this.tasks;
      } else if (this.status === 'pending') {
        this.filteredTasks = this.tasks.filter(task => !task.completed);
      } else if (this.status === 'completed') {
        this.filteredTasks = this.tasks.filter(task => task.completed);
      }
    }
  }
  constructor(private store: Store) {

  }
 

  completeTask(id: number) {
    this.store.dispatch(completeTask({ id }));
  }

  markTaskAsPending(id: number) {
    this.store.dispatch(markTaskAsPending({ id }));
  }
}

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
  filteredTasks: Task[] = [];

  constructor( private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] || changes['status']) {
      this.filterTasks();
    }
  }
  
 private filterTasks() {
    if (!this.tasks) {
      this.filteredTasks = [];
      return;
    }

    switch (this.status) {
      case 'pending':
        this.filteredTasks = this.tasks.filter(task => !task.completed);
        break;
      case 'completed':
        this.filteredTasks = this.tasks.filter(task => task.completed);
        break;
      default:
        this.filteredTasks = this.tasks;
    }
  }

 
  completeTask(id: number) {
    this.taskService.completeTask(id);
  }

  markTaskAsPending(id: number) {
    this.taskService.markTaskAsPending(id);
  }
}

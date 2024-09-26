import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks-form', pathMatch: 'full' }, 
  { path: 'tasks-form', component: TaskFormComponent }, 
  { path: 'tasks-list', component: TaskListComponent }, 
  { path: '**', redirectTo: 'tasks-form' } 
];

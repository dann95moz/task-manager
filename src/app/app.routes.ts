import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {path: '', component:TaskFormComponent},
  {path: '*',component:TaskFormComponent},
  {
    path:'tasks-list', component:TaskListComponent
  }
];

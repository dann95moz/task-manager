import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/store/task.actions';

// ANGULAR MATERIAL IMPORTS
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
// components
import {MatSnackBar} from '@angular/material/snack-bar';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task-service.service';
import { ValidationUtils } from 'src/app/utils/validation.utils';

//
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    //angular native modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //angular material modules
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [MatSnackBar],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit{
 
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService: TaskService) {

  }
  ngOnInit() {
    this.initForm();
  }
 
  private initForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      persons: this.fb.array([], [Validators.required, ValidationUtils.minArrayLength(1)])
    });
  }
  private resetForm() {
    this.taskForm.reset();
    while (this.persons.length !== 0) {
      this.persons.removeAt(0);
    }
  }

  openSnackBar(message: string) { // triggers notification on bottom of the screen
    this.snackBar.open(message,'',{
      duration: 3000
    });
  }

  get persons() {
    return this.taskForm.get('persons') as FormArray;
  }
  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), ValidationUtils.uniqueNameValidator(this.persons)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], [Validators.required, ValidationUtils.minArrayLength(1)])
    });
    this.persons.push(personForm);
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
  }

  addSkill(personIndex: number) {
    this.personSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.personSkills(personIndex).removeAt(skillIndex);
  }


  personSkills(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('skills') as FormArray;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = {
        ...this.taskForm.value,
        id: Date.now(),
        completed: false
      };
      this.taskService.addTask(task).subscribe({
        next: ()=>{
          this.resetForm()
        this.showNotification('Task created successfully')
      },
        error: (error)=>{
          this.showNotification('Error creating task');
          console.error('Error creating task:', error);
        }}
       
       
      );
    }
  }
  
  private showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

}

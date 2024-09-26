import { Component } from '@angular/core';
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
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      persons: this.fb.array([], [Validators.required, this.minArrayLength(1)])
    });
  }

  get persons() {
    return this.taskForm.get('persons') as FormArray;
  }

  personSkills(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('skills') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5), this.uniqueNameValidator()]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], [Validators.required, this.minArrayLength(1)])
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

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        id: Date.now(),
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.taskForm.reset();
      while (this.persons.length !== 0) {
        this.persons.removeAt(0);
      }
    }
  }

  minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { 'minLength': {actual: control.length, min: min} };
      }
      return null;
    };
  }

  uniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const name = control.value;
      const persons = this.persons.value;
      const isDuplicate = persons.some((person: any, index: number) => 
        person.fullName === name && this.persons.controls.indexOf(control.parent as FormGroup) !== index
      );
      return isDuplicate ? { 'duplicateName': true } : null;
    };
  }
}

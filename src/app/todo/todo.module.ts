import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FilterPipe } from './../pipes/todoFilter';


@NgModule({
  declarations: [TodoComponent, AddEditComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'add-edit-todo', component: AddEditComponent },
  { path: 'add-edit-todo/:id', component: AddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }

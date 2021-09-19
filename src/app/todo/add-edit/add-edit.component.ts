import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToDoService,ToDo } from "./../../services/to-do.service";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  public todoId: string;
  public ToDoItem: any = [];
  constructor(private router: Router, private _Activatedroute:ActivatedRoute,
      private fb: FormBuilder, public toDoService: ToDoService) { }

  toDoForm = this.fb.group({
    label: ['', Validators.required],
    description: ['', Validators.required],
    category: [''],
    done: [false]
  });

  ngOnInit() {
    this.todoId=this._Activatedroute.snapshot.paramMap.get("id");
    if(this.todoId){
      this.getSetTodoItem(this.todoId);
    }
  }

  getSetTodoItem(todoId: string) {
    return this.toDoService.getToDoItem(todoId).subscribe((data: {}) => {
      this.ToDoItem = data;
      this.toDoForm.patchValue({
        label: this.ToDoItem.label,
        description: this.ToDoItem.description,
        category: this.ToDoItem.category,
        done: this.ToDoItem.done === true || this.ToDoItem.done === 'true' ? 'true' : 'false'
      })
    }) 
  }

  onSubmit(toDodId: string) {
    // TODO: Use EventEmitter with form value
    console.warn(this.toDoForm.value);
    const payload = {
      id: (toDodId && toDodId !== '') ? toDodId : this.getUniqueId(),
      label: this.toDoForm.controls.label.value,
      description: this.toDoForm.controls.description.value,
      category: this.toDoForm.controls.category.value,
      done: (toDodId && toDodId !== '') ? this.toDoForm.controls.done.value : false
    };
    if(toDodId && toDodId !== '') {
      this.toDoService.updateToDo(toDodId, payload)
        .subscribe(res => {
            this.router.navigate(['/todo']);
          }, (err) => {
            console.log(err);
          });
    }else{
      this.toDoService.addToDo(payload)
        .subscribe(res => {
            this.router.navigate(['/todo']);
          }, (err) => {
            console.log(err);
          });
      }
  }

  getUniqueId(){
    return Math.random().toString(36).substr(2, 7);
  }

  onClickCancel() {
    this.router.navigate(['/todo/']);
  }
}

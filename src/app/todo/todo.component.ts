import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService, ToDo } from "./../services/to-do.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  ToDo: any = [];
  constructor(private router: Router, public toDoService: ToDoService) { }

  ngOnInit() {
    this.fetchToDo()
  }

  fetchToDo() {
    return this.toDoService.getToDoList().subscribe((data: {}) => {
      this.ToDo = data;
    })    
  } 

  onClickAddTodo() {
    this.router.navigate(['/todo/add-edit-todo']);
  }

  onClickEditTodo(toDoId: string) {
    this.router.navigate(['/todo/add-edit-todo/'+toDoId]);
  }

  onClickDeleteTodo(toDoId: string) {
    this.toDoService.deleteToDo(toDoId).subscribe((response)=>{
      this.fetchToDo();
    },(error=>{
    }));
  }

  onClickMarkDoneTodo(toDoId: string) {
    const payload = {
      done: true
    }
    this.toDoService.updateToDoItem(toDoId, payload).subscribe((response)=>{
      this.fetchToDo();
    },(error=>{
    }));
  }

}

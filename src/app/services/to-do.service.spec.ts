import { inject, TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';

describe('ToDoService', () => {
  let service;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ToDoService]
  }));

  it('should be created', () => {
    const service: ToDoService = TestBed.get(ToDoService);
    expect(service).toBeTruthy();
  });

  beforeEach(inject([ToDoService], (srv: ToDoService) => {
    service = srv;
  }));

  it('should return empty observable when called getToDoList', done => {
    service.getToDoList().subscribe(p => {
        expect(p).toEqual([]);
        done();
    })
  });

  it('should add todo and return all todo', done => {
    const todoToAdd = [
      {
        "id": '0lfph34',
        "label": "Wash Cloths",
        "description": "Want to wash my cloths",
        "category": "house",
        "done": "false"
      }
    ]

    service.addToDo(todoToAdd)
    service.getToDoList().subscribe(p => {
        expect(p).toEqual(todoToAdd);
        done();
    })
  })
});

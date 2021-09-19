import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class ToDo {
  id: string;
  label: string;
  description: string;
  category: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  endPoint = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getToDoList(): Observable<ToDo> {
    return this.httpClient.get<ToDo>(this.endPoint + '/tasks')
    .pipe(
      retry(1),
      catchError(this.httpErrorResponse)
    )
  }

  addToDo(data: ToDo): Observable<any> {
    return this.httpClient.post(this.endPoint + '/tasks', data)
      .pipe(
        retry(1),
        catchError(this.httpErrorResponse)
      )
  }

  getToDoItem(toDodId: string): Observable<ToDo> {
    return this.httpClient.get<ToDo>(this.endPoint + '/tasks/'+toDodId)
    .pipe(
      retry(1),
      catchError(this.httpErrorResponse)
    )
  }

  updateToDo(toDodId: string, data: ToDo): Observable<any> {
    let API_URL = `${this.endPoint}/tasks/${toDodId}`;
    return this.httpClient.put(API_URL, data).pipe(
      catchError(this.httpErrorResponse)
    )
  }

  updateToDoItem(toDodId: string, data: any): Observable<any> {
    let API_URL = `${this.endPoint}/tasks/${toDodId}`;
    return this.httpClient.patch(API_URL, data).pipe(
      catchError(this.httpErrorResponse)
    )
  }

  deleteToDo(toDodId: string): Observable<any> {
    let API_URL = `${this.endPoint}/tasks/${toDodId}`;
    return this.httpClient.delete(API_URL).pipe(
      catchError(this.httpErrorResponse)
    )
  }

  httpErrorResponse(error: any) {
    let errMsg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      errMsg = error.error.message;
    } else {
      // server side error
      errMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errMsg);
    return throwError(errMsg);
  }

}

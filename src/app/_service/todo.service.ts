import { Injectable } from '@angular/core';
import { Todo } from '../_model/todo';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
  private apiUrl = 'http://localhost:9081/todos/';

  constructor(private httpClient: HttpClient) { }

   findAll(): Observable<Array<Todo>>  {
     return this.httpClient.get<Array<Todo>>(this.apiUrl);
   }
  createTodo(todoData: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.apiUrl, todoData)
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  updateTodo(todoData: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.apiUrl + todoData.id, todoData)
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  deleteTodo(id: string): Observable<any> {
    return this.httpClient.delete<Todo>(this.apiUrl + id)
      .catch(error => Observable.throw(error.json().error || 'Server error'));

  }

}

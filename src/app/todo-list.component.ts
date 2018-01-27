import { Component, OnInit } from '@angular/core';
import { TodoService } from './_service/todo.service';
import { Todo } from './_model/todo';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  providers: [TodoService]
})

export class TodoListComponent implements OnInit {
  todos: Todo[];
  newTodo: Todo = new Todo();
  editing = false;
  editingTodo: Todo = new Todo();

  constructor(
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(): void {
    this.todoService.findAll()
      .subscribe(
        todos => {
          this.todos = todos;
        },
        err => {
          console.log(err);
        }

      );
  }

  createTodo(todoForm: NgForm): void {
    this.todoService.createTodo(this.newTodo)
      .subscribe(createTodo => {
        todoForm.reset();
        this.newTodo = new Todo();
        this.todos.unshift(createTodo);
      });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
  }

  updateTodo(todoData: Todo): void {
     this.todoService.updateTodo(todoData)
      .subscribe(updatedTodo => {
        const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
        Object.assign(existingTodo, updatedTodo);
        this.clearEditing();
      });
  }

  toggleCompleted(todoData: Todo): void {
    todoData.completed = !todoData.completed;
    this.todoService.updateTodo(todoData)
      .subscribe(updatedTodo => {
        const existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
        Object.assign(existingTodo, updatedTodo);
      });
  }

  editTodo(todoData: Todo): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }

  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }
}

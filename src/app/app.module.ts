import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list.component';
import { MatButtonModule, MatCheckboxModule, MatInputModule,
  MatListModule, MatIconModule } from '@angular/material';
import { TodoService } from './_service/todo.service';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, MatButtonModule, MatCheckboxModule, MatInputModule,
    MatListModule, MatIconModule


  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

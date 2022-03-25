import { Component } from '@angular/core';
import { Task } from './MyComponents/task/task';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Task Tracker';
  isOpenNewTask: boolean = false;
  taskForUpdate!: Task;
  isNewTaskClicked:boolean = false;

  taskList: Array<Task> = [
    {
      name: 'task1',
      id: uuid(),
      description: 'this is description of task',
      priority: 'low',
      status: 'new',
      startDate: new Date(),
      endDate: undefined, 
    },
    {
      name: 'task2',
      id: uuid(),
      description: 'this is description of task',
      priority: 'medium',
      status: 'new',
      startDate: new Date(),
      endDate: undefined,
    },
    {
      name: 'task4',
      id: uuid(),
      description: 'this is description of task',
      priority: 'high',
      status: 'progress',
      startDate: new Date(),
      endDate: undefined,
    },
    {
      name: 'task5',
      id: uuid(),
      description: 'this is description of task',
      priority: 'high',
      status: 'progress',
      startDate: new Date(),
      endDate: undefined,
    },
    
    {
      name: 'task9',
      id: uuid(),
      description: 'this is description of task',
      priority: 'high',
      status: 'completed',
      startDate: new Date(),
      endDate: undefined,
    },
    {
      name: 'task10',
      id: uuid(),
      description: 'this is description of task',
      priority: 'high',
      status: 'completed',
      startDate: new Date(),
      endDate: undefined,
    },
  ];

  openTaskModal() {
    this.isOpenNewTask = true;
  }

  toggleNewTask(){
    this.isNewTaskClicked = true;
  }
  closeTaskModal() {
    this.isOpenNewTask = false;
    this.isNewTaskClicked = false;
  }

  addTask(task: Task) {
    task.id = uuid();
    task.startDate = new Date();
    this.taskList.push(task);
    this.closeTaskModal();
    console.log(task);
  }

  deleteTask(task: Task) {
    this.taskList = this.taskList.filter((t) => t !== task);
  }

  openModalForUpdate(task: Task) {
    this.isOpenNewTask = true;
    this.taskForUpdate = task;
  }

  updateTask(task: Task) {
    this.taskList.forEach((t) => {
      if (t.id == task.id) {
        t.name = task.name;
        t.description = task.description;
        t.priority = task.priority;
        t.status = task.status;
        if (t.status == 'completed') t.endDate = new Date();
      }
    });
    this.isOpenNewTask = false;
    
  }

}

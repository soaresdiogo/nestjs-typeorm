import { randomUUID } from 'node:crypto';
import { Task } from './Task';
import { TaskStatus } from './task-status';

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _tasks: Task[] = [];

  constructor(id: string, name: string, email: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email');
    }

    this._id = id;
    this._name = name;
    this._email = email;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get tasks(): Task[] {
    return [...this._tasks];
  }

  addTask(title: string): Task {
    const newTask = new Task(this._generateTaskId(), title, TaskStatus.PENDING);
    this._tasks.push(newTask);
    return newTask;
  }

  private _generateTaskId(): string {
    return randomUUID();
  }
}

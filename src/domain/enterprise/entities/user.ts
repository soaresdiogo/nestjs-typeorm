import { Task } from './Task';
import { TaskStatus } from './task.status';
import { v4 as uuidv4 } from 'uuid';

interface UserProps {
  id?: string;
  name: string;
  email: string;
}

interface TaskProps {
  title: string;
  description: string;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _tasks: Task[] = [];

  constructor({ id, name, email }: UserProps) {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email');
    }

    this._name = name;
    this._email = email;
    this._id = id || uuidv4();
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

  addTask({ title, description }: TaskProps): Task {
    const newTask = new Task({
      id: this._generateTaskId(),
      title,
      description,
      status: TaskStatus.PENDING,
    });
    this._tasks.push(newTask);
    return newTask;
  }

  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }

  deleteTask(taskId: string): boolean {
    const taskIndex = this._tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return false;
    }
    this._tasks.splice(taskIndex, 1);
    return true;
  }

  private _generateTaskId(): string {
    return uuidv4();
  }
}

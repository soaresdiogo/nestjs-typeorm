import { TaskStatus } from './task-status';

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}
export class Task {
  private _id: string;
  private _title: string;
  private _description?: string;
  private _status: TaskStatus;
  private _createdAt: Date;

  constructor(props: TaskProps) {
    const { id, title, description, status = TaskStatus.PENDING } = props;

    if (!title || title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    if (title.length > 255) {
      throw new Error('Title cannot exceed 255 characters');
    }

    this._id = id;
    this._title = title;
    this._description = description;
    this._status = status;
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  updateStatus(newStatus: TaskStatus): void {
    if (!Object.values(TaskStatus).includes(newStatus)) {
      throw new Error('Invalid status');
    }
    this._status = newStatus;
  }
}

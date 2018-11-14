import { TaskCategory, TaskModule } from './enums';

export interface Task {
    _id: string;
    title: string;
    description: string;
    category: TaskCategory;
    module: TaskModule;
}

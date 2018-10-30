import { TaskCategory, TaskModule } from './enums';

export interface Task {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    module: TaskModule;
}

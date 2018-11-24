import { ETaskCategory, ETaskModule } from './enums';

export interface Task {
    _id: string;
    title: string;
    description: string;
    category: ETaskCategory;
    module: ETaskModule;
}

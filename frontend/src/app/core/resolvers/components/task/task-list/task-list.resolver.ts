import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Task } from '../../../../models';
import { Observable } from 'rxjs';
import { TaskService } from '../../../../services/components/task/task.service';

@Injectable()
export class TaskListResolver implements Resolve<Task[]> {
    constructor(private taskService: TaskService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.taskService.getAll();
    }
}

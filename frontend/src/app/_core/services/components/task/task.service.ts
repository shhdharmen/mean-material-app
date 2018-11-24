import { Injectable } from '@angular/core';
import { CoreModule } from '@appcore/core.module';
import { HttpClient } from '@angular/common/http';
import { Task } from '@appcore/models';
import { ApiUrlService } from '../../api-url/api-url.service';

@Injectable({
  providedIn: CoreModule
})
export class TaskService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getAll(sort?: string, order?: string, page?: number, limitTo?: number) {
    if (!sort) {
      sort = 'title';
    }
    if (!order) {
      order = 'asc';
    }
    if (!page) {
      page = 0;
    }
    if (!limitTo) {
      limitTo = 10;
    }
    return this.http.get<{ success: boolean, tasks: Task[], totalTasks: number }>
      (`${this.apiUrlService.API_URL}/task?sort=${sort}&order=${order}&page=${page + 1}&limitTo=${limitTo}`);
  }

  get(id: string) {
    return this.http.get<{ success: boolean, tasks: Task[] }>(`${this.apiUrlService.API_URL}/task/${id}`);
  }

  add(task: Task) {
    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrlService.API_URL}/task`, task);
  }

  update(id: string, task: Task) {
    return this.http.put<{ success: boolean, message: string }>(`${this.apiUrlService.API_URL}/task/${encodeURIComponent(id)}`,
      { task: task });
  }

  delete(id: string) {
    return this.http.delete<{ success: boolean, message: string }>(`${this.apiUrlService.API_URL}/task/${encodeURIComponent(id)}`);
  }
}

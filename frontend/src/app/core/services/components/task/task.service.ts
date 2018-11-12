import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { HttpClient } from '@angular/common/http';
import { Task } from '@app/core/models';
import { ApiUrlService } from '../../api-url/api-url.service';

@Injectable({
  providedIn: CoreModule
})
export class TaskService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getAll(sort?: string, order?: string, page?: number) {
    if (!sort) {
      sort = 'title';
    }
    if (!order) {
      order = 'asc';
    }
    if (!page) {
      page = 0;
    }
    return this.http.get<{ success: boolean, tasks: Task[] }>
      (`${this.apiUrlService.API_URL}/task?sort=${sort}&order=${order}&page=${page + 1}`);
  }

  add(task: Task) {
    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrlService.API_URL}/task`, task);
  }
}

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

  getAll() {
    return this.http.get<Task[]>(`${this.apiUrlService.API_URL}/task`);
  }
}

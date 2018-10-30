import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ApiUrlService {
  API_URL = environment.apiUrl;
}

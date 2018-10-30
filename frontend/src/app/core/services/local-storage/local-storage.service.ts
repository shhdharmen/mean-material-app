import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {

  constructor() { }
}

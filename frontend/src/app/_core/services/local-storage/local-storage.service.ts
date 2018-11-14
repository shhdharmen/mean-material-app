import { Injectable } from '@angular/core';
import { CoreModule } from '@appcore/core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {

  constructor() { }
}

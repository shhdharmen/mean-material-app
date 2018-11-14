import { Injectable } from '@angular/core';
import { CoreModule } from '@appcore/core.module';

@Injectable({
  providedIn: CoreModule
})
export class UtilityService {

  constructor() { }
  tick_then(fn: () => any) { setTimeout(fn, 0); }
}

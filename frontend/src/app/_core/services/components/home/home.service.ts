import { Injectable } from '@angular/core';
import { CoreModule } from '@appcore/core.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class HomeService {
  private currentChild_ = new BehaviorSubject(null);
  currentChild$ = this.currentChild_.asObservable();

  constructor() { }

  updateChild(childName: string) {
    this.currentChild_.next(childName);
  }
}

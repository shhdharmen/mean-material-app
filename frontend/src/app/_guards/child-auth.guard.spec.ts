import { TestBed, async, inject } from '@angular/core/testing';
import { ChildAuthGuard } from './child-auth.guard';


describe('ChildAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildAuthGuard]
    });
  });

  it('should ...', inject([ChildAuthGuard], (guard: ChildAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

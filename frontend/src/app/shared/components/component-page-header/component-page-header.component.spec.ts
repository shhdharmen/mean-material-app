import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPageHeaderComponent } from './component-page-header.component';

describe('ComponentPageHeaderComponent', () => {
  let component: ComponentPageHeaderComponent;
  let fixture: ComponentFixture<ComponentPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

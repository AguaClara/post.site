import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantselectorComponent } from './plantselector.component';

describe('PlantselectorComponent', () => {
  let component: PlantselectorComponent;
  let fixture: ComponentFixture<PlantselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

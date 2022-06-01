import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterDateComponent } from './custom-filter-date.component';

describe('CustomFilterDateComponent', () => {
  let component: CustomFilterDateComponent;
  let fixture: ComponentFixture<CustomFilterDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFilterDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterAgreementComponent } from './custom-filter-agreement.component';

describe('CustomFilterAgreementComponent', () => {
  let component: CustomFilterAgreementComponent;
  let fixture: ComponentFixture<CustomFilterAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFilterAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

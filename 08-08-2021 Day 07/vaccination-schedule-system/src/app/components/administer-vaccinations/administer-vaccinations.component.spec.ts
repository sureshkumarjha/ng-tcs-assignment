import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministerVaccinationsComponent } from './administer-vaccinations.component';

describe('AdministerVaccinationsComponent', () => {
  let component: AdministerVaccinationsComponent;
  let fixture: ComponentFixture<AdministerVaccinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministerVaccinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministerVaccinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

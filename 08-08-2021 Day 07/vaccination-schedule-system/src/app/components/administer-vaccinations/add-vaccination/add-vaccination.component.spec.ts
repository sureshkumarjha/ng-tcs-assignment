import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaccinationComponent } from './add-vaccination.component';

describe('AddVaccinationComponent', () => {
  let component: AddVaccinationComponent;
  let fixture: ComponentFixture<AddVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVaccinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

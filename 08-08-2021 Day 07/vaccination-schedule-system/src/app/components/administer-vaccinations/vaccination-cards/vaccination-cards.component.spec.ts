import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCardsComponent } from './vaccination-cards.component';

describe('VaccinationCardsComponent', () => {
  let component: VaccinationCardsComponent;
  let fixture: ComponentFixture<VaccinationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

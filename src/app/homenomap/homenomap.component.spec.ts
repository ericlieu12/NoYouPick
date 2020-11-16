import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenomapComponent } from './homenomap.component';

describe('HomenomapComponent', () => {
  let component: HomenomapComponent;
  let fixture: ComponentFixture<HomenomapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomenomapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomenomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

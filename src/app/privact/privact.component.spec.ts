import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivactComponent } from './privact.component';

describe('PrivactComponent', () => {
  let component: PrivactComponent;
  let fixture: ComponentFixture<PrivactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

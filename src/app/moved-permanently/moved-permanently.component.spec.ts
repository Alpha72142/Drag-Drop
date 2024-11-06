import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovedPermanentlyComponent } from './moved-permanently.component';

describe('MovedPermanentlyComponent', () => {
  let component: MovedPermanentlyComponent;
  let fixture: ComponentFixture<MovedPermanentlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovedPermanentlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovedPermanentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

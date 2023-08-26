import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgGoBackComponent } from './svg-go-back.component';

describe('SvgGoBackComponent', () => {
  let component: SvgGoBackComponent;
  let fixture: ComponentFixture<SvgGoBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgGoBackComponent]
    });
    fixture = TestBed.createComponent(SvgGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

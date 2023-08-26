import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDeleteComponent } from './svg-delete.component';

describe('SvgDeleteComponent', () => {
  let component: SvgDeleteComponent;
  let fixture: ComponentFixture<SvgDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgDeleteComponent]
    });
    fixture = TestBed.createComponent(SvgDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

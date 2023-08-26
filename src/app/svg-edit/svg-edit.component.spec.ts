import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgEditComponent } from './svg-edit.component';

describe('SvgEditComponent', () => {
  let component: SvgEditComponent;
  let fixture: ComponentFixture<SvgEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgEditComponent]
    });
    fixture = TestBed.createComponent(SvgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

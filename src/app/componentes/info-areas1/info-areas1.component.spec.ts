import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAreas1Component } from './info-areas1.component';

describe('InfoAreas1Component', () => {
  let component: InfoAreas1Component;
  let fixture: ComponentFixture<InfoAreas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAreas1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAreas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

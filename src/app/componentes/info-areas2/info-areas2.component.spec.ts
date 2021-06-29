import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAreas2Component } from './info-areas2.component';

describe('InfoAreas2Component', () => {
  let component: InfoAreas2Component;
  let fixture: ComponentFixture<InfoAreas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAreas2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAreas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

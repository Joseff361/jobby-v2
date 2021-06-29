import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninEstudiantesComponent } from './signin-estudiantes.component';

describe('SigninEstudiantesComponent', () => {
  let component: SigninEstudiantesComponent;
  let fixture: ComponentFixture<SigninEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

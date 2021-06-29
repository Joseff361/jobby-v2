import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninEmpresasComponent } from './signin-empresas.component';

describe('SigninEmpresasComponent', () => {
  let component: SigninEmpresasComponent;
  let fixture: ComponentFixture<SigninEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

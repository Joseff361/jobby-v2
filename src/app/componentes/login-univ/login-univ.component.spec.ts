import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUnivComponent } from './login-univ.component';

describe('LoginUnivComponent', () => {
  let component: LoginUnivComponent;
  let fixture: ComponentFixture<LoginUnivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUnivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUnivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

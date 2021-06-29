import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../shared/Dto/Login';
import { EstudianteService } from '../../services/estudiante.service';
import { SesionStorageService } from '../../services/sesion-storage.service';
import { MensajeService } from '../../services/mensaje.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormularioLogin: FormGroup;
  FormularioLoginDto: Login;

  mensajeError: String;
  mensajeExito: String;
  cargando: Boolean = false;

  @ViewChild('fffform') FormularioLoginDirectiva;

  formErrors = {
    'Correo': '',
    'Contrasenia': ''
  };

  validationMessages = {
    'Correo': {
      'required' : 'El  nombre de usuario de empresa es requerido.',
      'email'    : 'El correo debe seguir el patron indicado'
    },
    'Contrasenia': {
      'required' : 'El contraseña es requerida.',
      'minlength': 'La contraseña requiere 5 caracteres como minimo.',
      'maxlength': 'La contraseña requiere 25 caracteres como maximo.'
    },
  };

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private sesionStorageService: SesionStorageService,
    private mensajeService: MensajeService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.FormularioLogin = this.fb.group({
      Correo: ['', [Validators.required, Validators.email ]],
      Contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ]
    });

    this.FormularioLogin.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.FormularioLogin) { return; } //has been created?
    
    const form = this.FormularioLogin;
    
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {//make sure that the object contain the property
        
        this.formErrors[field] = ''; // clear previous error message (if any)

        const control = form.get(field); //const form = this.feedbackForm;

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) { // const control = form.get(field);
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.FormularioLoginDto = this.FormularioLogin.value;
    
    this.mensajeError = null;
    this.mensajeExito = null;
    this.cargando = true;

    this.estudianteService.login(this.FormularioLoginDto)
      .subscribe( data => {
        this.cargando = false;

        this.mensajeExito = "Login exitoso. Bienvenido!";

        this.sesionStorageService.guardarCredenciales(data);

        this.mensajeService.sendMessage(data.correo);

        this.FormularioLogin.reset({
          Correo: '',
          Contrasenia: ''
        });
    
        this.FormularioLoginDirectiva.resetForm(); //ensure a completely reset
        //#fform="ngForm"

        setTimeout(() => {
          this.route.navigate(['/usuarios']);
        }, 1000);
        
      }, err => {
        this.mensajeError = err.error.mensaje;
        this.cargando = false;
      })
  }

}

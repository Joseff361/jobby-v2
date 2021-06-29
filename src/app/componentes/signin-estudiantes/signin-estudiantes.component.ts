import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../shared/Dto/Estudiante';
import { EstudianteService } from '../../services/estudiante.service';


@Component({
  selector: 'app-signin-estudiantes',
  templateUrl: './signin-estudiantes.component.html',
  styleUrls: ['./signin-estudiantes.component.css']
})
export class SigninEstudiantesComponent implements OnInit {

  FormularioEstudiante: FormGroup;
  FormularioEstudianteDto: Estudiante;

  mensajeError: String;
  mensajeExito: String;
  cargando: Boolean = false;

  @ViewChild('ffform') FormularioEstudianteDirectiva;

  formErrors = {
    'Nombre': '',
    'Apellido': '',
    'Correo': '',
    'Contrasenia': ''
  };

  validationMessages = {
    'Nombre': {
      'required' : 'El  nombre de estudiante es requerido.',
      'minlength': 'El nombre de estudiante requiere 2 caracteres como minimo.',
      'maxlength': 'El nombre de estudiante requiere 25 caracteres como maximo.'
    },
    'Apellido': {
      'required' : 'El apellido es requerido.',
      'minlength': 'El apellido equiere 2 caracteres como minimo.',
      'maxlength': 'El apellido requiere 25 caracteres como maximo.'
    },
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
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.FormularioEstudiante = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      Apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
      Correo: ['', [Validators.required, Validators.email ]],
      Contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ]
    });

    this.FormularioEstudiante.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.FormularioEstudiante) { return; } //has been created?
    
    const form = this.FormularioEstudiante;
    
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
    this.FormularioEstudianteDto = this.FormularioEstudiante.value;
    
    this.mensajeError = null;
    this.mensajeExito = null;
    this.cargando = true;

    this.estudianteService.registrarEstudiante(this.FormularioEstudianteDto)
      .subscribe( data => {

        this.cargando = false;

        this.mensajeExito = data.mensaje;

        this.FormularioEstudiante.reset({
          Nombre: '',
          Apellido: '',
          Correo: '',
          Contrasenia: ''
        });
    
        this.FormularioEstudianteDirectiva.resetForm(); //ensure a completely reset
        //#fform="ngForm"

      }, err => {
        this.mensajeError = err.error.mensaje;
        this.cargando = false;
      })
  }

}

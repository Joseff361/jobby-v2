import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../../shared/Dto/Empresa';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin-empresas',
  templateUrl: './signin-empresas.component.html',
  styleUrls: ['./signin-empresas.component.css']
})
export class SigninEmpresasComponent implements OnInit {


  FormularioEmpresa: FormGroup;
  FormularioEmpresaDto: Empresa;

  mensajeError: String;
  mensajeExito: String;
  cargando: Boolean = false;

  @ViewChild('fform') FormularioEmpresaDirectiva;

  formErrors = {
    'NombreDeEmpresa': '',
    'Locacion': '',
    'RUC': '',
    'SitioWeb': '',
    'Descripcion': '',
    'Correo': '',
    'Contrasenia': ''
  };

  validationMessages = {
    'NombreDeEmpresa': {
      'required' : 'El  nombre de empresa es requerido.',
      'minlength': 'El nombre de empresa requiere 2 caracteres como minimo.',
      'maxlength': 'El nombre de empresa requiere 25 caracteres como maximo.'
    },
    'Locacion': {
      'required' : 'La locacion de empresa es requerida.',
      'minlength': 'La locacion de empresa requiere 5 caracteres como minimo.',
      'maxlength': 'La locacion de empresa  requiere 25 caracteres como maximo.'
    },
    'RUC': {
      'required' : 'El RUC es requerido.'
    },
    'SitioWeb': {
      'required' : 'El doiminio del sitio web es requerido .',
      'minlength': 'La doiminio del sitio webrequiere 11 caracteres como minimo.',
    },
    'Descripcion': {
      'required' : 'La descripcion de la empresa es requerida.',
      'minlength': 'La descripcion de la empresa requiere 5 caracteres como minimo.',
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
    private empresaService: EmpresaService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.FormularioEmpresa = this.fb.group({
      NombreDeEmpresa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      Locacion: ['', [Validators.required, Validators.minLength(5)] ],
      RUC: ['', [Validators.required] ],
      SitioWeb: ['', [Validators.required, Validators.minLength(11)]],
      Descripcion: ['', [Validators.required, Validators.minLength(5) ]],
      Correo: ['', [Validators.required, Validators.email ]],
      Contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ]
    });

    this.FormularioEmpresa.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.FormularioEmpresa) { return; } //has been created?
    
    const form = this.FormularioEmpresa;
    
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
    this.FormularioEmpresaDto = this.FormularioEmpresa.value;
    this.mensajeError = null;
    this.mensajeExito = null;
    this.cargando = true;
    
    this.empresaService.registrarEmpresa(this.FormularioEmpresaDto)
      .subscribe( data => {

        this.cargando = false;

        this.mensajeExito = data.mensaje;

        this.FormularioEmpresa.reset({
          NombreDeEmpresa: '',
          Locacion: '',
          RUC: '',
          SitioWeb: '',
          Descripcion: '',
          Correo: '',
          Contrasenia: ''
        });
    
        this.FormularioEmpresaDirectiva.resetForm(); //ensure a completely reset
        //#fform="ngForm"

        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 1000);

      }, err => {
        this.mensajeError = err.error.mensaje;
        this.cargando = false;
      })

      
  }

}

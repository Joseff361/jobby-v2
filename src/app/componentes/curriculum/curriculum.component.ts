import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SesionStorageService } from 'src/app/services/sesion-storage.service';
import { Curriculum, EstudianteDto } from 'src/app/shared/Dto/EstudianteDto';
import { OfertaPorEmpresa } from 'src/app/shared/Dto/OfertaPorEmpresa';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  @Input() estudiante: EstudianteDto;
  @ViewChild('fform') directivaFormularioCurriculum;

  formularioBase: FormGroup;
  formularioDto: Curriculum;

  // FORMULARIO
  miDireccion: string = "";
  miEmail: string = "";
	miFormacion: string = "";
	miExperiencia: string = "";
	misHabilidades: string = "";
	misIdiomas: string = "";

  // CARGANDO
  mensajeError: String;
  mensajeExito: String;
  cargando: Boolean = false;

  //OFERTAS EMPLEO
  ofertasEmpleo: OfertaPorEmpresa[];

  formErrors = {
    "direccion": "",
	  "email": "",
	  "formacion": "",
	  "experiencia": "",
	  "habilidades": "",
	  "idiomas": ""
  };

  validationMessages = {
    'direccion': {
      'required' : 'La direccion es requerida',
      'minlength': 'La direccion requiere 10 caracteres como minimo.'
    },
    'email': {
      'required' : 'La correo es requerido',
      'email': 'La correo debbe seguir la sintaxis mostrada.'
    },
    'formacion': {
      'required' : 'La descripcion de formacion es requerido',
      'minlength': 'La descripcion requiere 8 caracteres como minimo.'
    },
    'habilidades': {
      'required' : 'La descripcion de habilidades es requerida',
      'minlength': 'La descripcion requiere 5 caracteres como minimo.'
    },    
    'idiomas': {
      'required' : 'La descripcion de idioma(s) es requerido',
      'minlength': 'La descripcion requiere 5 caracteres como minimo.'
    },
  }

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private sesionStorageService: SesionStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log(this.estudiante);

    this.ofertasEmpleo = this.estudiante.ofertasEmpresa;

    // RELLENAR EL FORMULARIO DE ESTUDIANTE CON VALORES DE LA BBDD
    if(this.estudiante.curriculum != null){
      this.miDireccion = this.estudiante.curriculum.direccion != null ? this.estudiante.curriculum.direccion : ""; 
      this.miEmail = (this.estudiante.curriculum.email)? this.estudiante.curriculum.email : "";
      this.miFormacion = (this.estudiante.curriculum.formacion)? this.estudiante.curriculum.formacion : "";
      this.miExperiencia = (this.estudiante.curriculum.experiencia)? this.estudiante.curriculum.experiencia : "";
      this.misHabilidades = (this.estudiante.curriculum.habilidades)? this.estudiante.curriculum.habilidades : "";
      this.misIdiomas = (this.estudiante.curriculum.idiomas) ? this.estudiante.curriculum.idiomas : "";
    }

    this.createForm();
  }

  createForm(): void {
    this.formularioBase = this.fb.group({
      direccion: [{value: this.miDireccion, disabled: true}, [Validators.required, Validators.minLength(10)] ],
      email: [{value: this.miEmail, disabled: true}, [Validators.required, Validators.email] ],
      formacion: [{value: this.miFormacion, disabled: true}, [Validators.required, Validators.minLength(8)] ],
      experiencia: {value: this.miExperiencia, disabled: true},
      habilidades: [{value: this.misHabilidades, disabled: true}, [Validators.required, Validators.minLength(5)] ],
      idiomas: [{value: this.misIdiomas, disabled: true}, [Validators.required, Validators.minLength(5)] ],
    });

    this.formularioBase.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.formularioBase) { return; } //has been created?
    
    const form = this.formularioBase;
    
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

  onSubmit(): void{
    console.log(this.formularioBase.value);
    this.formularioDto = this.formularioBase.value;

    this.cargando = true;

    this.estudianteService.guardarCurriculum(this.formularioDto, this.sesionStorageService.obtenerIdTipo())
      .subscribe( data => {
        console.log(data);

        this.cargando = false;
        this.mensajeExito = "Curriculum Vitae actualizado!";

        setTimeout(() => {
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/usuarios']);
          });
        }, 2000);

      }, err =>{
        this.mensajeError = err.error.mensaje;
        this.cargando = false;
      })
  }

  editarFormulario(): void{
    this.formularioBase.get('direccion').enable();
    this.formularioBase.get('email').enable();
    this.formularioBase.get('formacion').enable();
    this.formularioBase.get('experiencia').enable();
    this.formularioBase.get('habilidades').enable();
    this.formularioBase.get('idiomas').enable();
  }


  cancelar(): void{
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['/usuarios']);
      });
  }
}

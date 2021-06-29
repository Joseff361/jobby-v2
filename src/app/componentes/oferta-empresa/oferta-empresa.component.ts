import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfertaEmpresaDto} from '../../shared/Dto/OfertaEmpresaDto';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oferta-empresa',
  templateUrl: './oferta-empresa.component.html',
  styleUrls: ['./oferta-empresa.component.css']
})
export class OfertaEmpresaComponent implements OnInit {

  @ViewChild('fform') directivaOfertaTrabajo;

  formularioOE: FormGroup;
  formularioOEDto: OfertaEmpresaDto;

  mensajeError: String;
  mensajeExito: String;
  cargando: Boolean = false;

  formErrors = {
    'IdEmpresa': '',
	  'Descripcion': '',
	  'Jornada':'',
    'Salario': '',
    'Fecha': '',
    'Requisitos': '',
    'Beneficios':'', 
    'Area': ''
  };

  validationMessages = {
    'Descripcion': {
      'required' : 'La descripcion es requerida',
      'minlength': 'La descripcion requiere 20 caracteres como minimo.'
    },
    'Jornada': {
      'required' : 'La jornada es requerida',
      'minlength': 'El campo jornada requiere 8 caracteres como minimo.'
    },
    'Salario': {
    'required' : 'El salaio es requerido',
    'minlength': 'El campo salario requiere 8 caracteres como minimo.'
    },
    'Fecha': {
    'required' : 'La descripcion es requerida'
    },
    'Requisitos': {
    'required' : 'La descripcion es requerida',
    'minlength': 'La descripcion requiere 8 caracteres como minimo.'
    },
    'Beneficios': {
    'required' : 'Los beneficios es requerida',
    'minlength': 'El campo beneficios requiere 8 caracteres como minimo.'
    },
    'Area': {
    'required' : 'El area es requerida'
    }
  }

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formularioOE = this.fb.group({
      IdEmpresa: ['', ],
      Descripcion: ['', [Validators.required, Validators.minLength(20)] ],
      Jornada: ['', [Validators.required, Validators.minLength(8)] ],
      Salario: ['', [Validators.required, Validators.minLength(8)] ],
      //Fecha: ['', [Validators.required] ],
      Requisitos: ['', [Validators.required, Validators.minLength(8)] ],
      Beneficios: ['', [Validators.required, Validators.minLength(8)] ],
      Area: ['', [Validators.required] ]
    });

    this.formularioOE.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.formularioOE) { return; } //has been created?
    
    const form = this.formularioOE;
    
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
    this.formularioOEDto = this.formularioOE.value;
    console.log(this.formularioOEDto);
    this.mensajeError = null;
    this.mensajeExito = null;
    this.cargando = true;

    this.empresaService.publicarOfertaDeTrabajo(this.formularioOEDto)
      .subscribe( data => {

        this.cargando = false;

        this.mensajeExito = data.mensaje;

        console.log(data);

        this.formularioOE.reset({
          Descripcion: '',
          Jornada:'',
          Salario: '',
          Fecha: '',
          Requisitos: '',
          Beneficios:'', 
          Area: ''
        });
        this.directivaOfertaTrabajo.resetForm(); //ensure a completely reset
        //#fform="ngForm"

        this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/usuarios']);
        }) 

      }, err => {
        this.mensajeError = err.error.mensaje;
        this.cargando = false;
      })


  }
}

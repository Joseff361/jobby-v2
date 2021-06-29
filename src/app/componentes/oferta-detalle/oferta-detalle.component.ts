import { Component, OnInit, Input } from '@angular/core';
import { OfertaPorEmpresa } from '../../shared/Dto/OfertaPorEmpresa';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Postulacion } from 'src/app/shared/Dto/Postulacion';
import { SesionStorageService } from 'src/app/services/sesion-storage.service';


@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css']
})
export class OfertaDetalleComponent implements OnInit {
  oferta: OfertaPorEmpresa;

  //MENSAJES POS TRANSACCION
  mensajeError: String;
  mensajeExito: String;
  cargando: Boolean = false;

  constructor(
    private route: Router,
    private spinner: NgxSpinnerService,
    private estudianteService: EstudianteService,
    private sesionStorageService: SesionStorageService
  ) { 
  }

  ngOnInit(): void {
    this.spinner.show();
    this.oferta = JSON.parse(window.sessionStorage.getItem('OFERTA-DETALLE'));
    this.spinner.hide();
  }

  volver(): void{
    this.route.navigate(['/scraping']);
  }

  postular(): void{

    this.cargando = true;

    let miPostulacion = new Postulacion(Number(this.sesionStorageService.obtenerId()), this.oferta.id);
    this.estudianteService.postularseAOferta(miPostulacion)
      .subscribe( data =>{
        this.cargando = false;

        this.mensajeExito = "Postulacion exitosa!";
      }, err => {
        this.mensajeError = err.error.mensaje;
        this.cargando = false;
      })
  }
}

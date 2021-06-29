import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Oferta } from 'src/app/shared/WebScrap/Oferta';
import { EmpresaService } from '../../services/empresa.service';
import { OfertaPorEmpresa } from '../../shared/Dto/OfertaPorEmpresa';

@Component({
  selector: 'app-info-areas2',
  templateUrl: './info-areas2.component.html',
  styleUrls: ['./info-areas2.component.css']
})
export class InfoAreas2Component implements OnInit {

  ofertasEmpleo: OfertaPorEmpresa[];
  @Input() IdTipo: Number;


  constructor(
    private empresaService: EmpresaService,
    private route: Router
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void{
    if(this.IdTipo != null){
      this.empresaService.obtenerOferfasEmpleoPorEmpresa()
      .subscribe( data => {
        this.ofertasEmpleo = data;
      }, err => {
        console.log(err);
      })
    }
  }

  verPostulantes(oferta: OfertaPorEmpresa): void{
    window.sessionStorage.setItem('POSTULANTES', JSON.stringify(oferta.estudiantes));
    this.route.navigate(['/postulantes']);
  }

}
